// Chat API utility functions for communicating with n8n webhook

// Constants
const DEFAULT_CHAT_SESSION_KEY = 'sessionId';
const DEFAULT_CHAT_INPUT_KEY = 'chatInput';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
const MESSAGE_LIMIT = 2;
const TIMEOUT_MINUTES = 30;

// Session tracking
const sessionMessages: Record<string, { count: number; lastReset: number }> = {};

// Rate limit check function
function checkRateLimit(sessionId: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const session = sessionMessages[sessionId] || { count: 0, lastReset: now };

  // Reset count if timeout has passed
  if (now - session.lastReset > TIMEOUT_MINUTES * 60 * 1000) {
    session.count = 0;
    session.lastReset = now;
  }

  if (session.count >= MESSAGE_LIMIT) {
    const remainingTime = Math.ceil((TIMEOUT_MINUTES * 60 * 1000 - (now - session.lastReset)) / 60000);
    return {
      allowed: false,
      error: `Has alcanzado el límite de mensajes. Por favor, espera ${remainingTime} minutos antes de enviar más mensajes.`
    };
  }

  // Update session data
  session.count++;
  sessionMessages[sessionId] = session;
  return { allowed: true };
}

// Enums
export enum MessageRole {
  User = 'user',
  Assistant = 'assistant'
}

// Types and Interfaces
export interface ChatOptions {
  readonly webhookUrl: string;
  readonly chatSessionKey?: string;
  readonly chatInputKey?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly webhookConfig?: Readonly<{
    method?: 'GET' | 'POST';
    headers?: Readonly<Record<string, string>>;
  }>;
}

export interface Message {
  readonly id: string;
  readonly content: string;
  readonly role: MessageRole;
  readonly timestamp: number;
}

export interface ChatResponse {
  readonly sessionId: string;
  readonly messages: readonly Message[];
}

export interface SendMessageResponse extends ChatResponse {
  readonly output: string;
}

export type LoadPreviousSessionResponse = ChatResponse;

// Error Types
export class ChatApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: string
  ) {
    super(message);
    this.name = 'ChatApiError';
  }
}

// Type Guards
export const isHtmlResponse = (text: string): boolean =>
  text.trim().toLowerCase().startsWith('<!doctype html>') ||
  text.trim().toLowerCase().startsWith('<html');

async function authenticatedFetch<T>(...args: Parameters<typeof fetch>): Promise<T> {
  const body = args[1]?.body;
  const headers: RequestInit['headers'] & { 'Content-Type'?: string; 'Accept'?: string } = {
    ...args[1]?.headers,
    'Accept': 'application/json',
  };

  // Automatically set content type to application/json if body is FormData
  if (body instanceof FormData) {
    delete headers['Content-Type'];
  } else {
    headers['Content-Type'] = 'application/json';
  }
  
  // Log the request details for debugging
  console.log(`Fetching ${args[0]} with method: ${args[1]?.method || 'GET'}`);
  
  const response = await fetch(args[0], {
    ...args[1],
    mode: 'cors',
    cache: 'no-cache',
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}. Response: ${text.substring(0, 200)}`);
  }

  const text = await response.text();
  
  // Try to detect if the response is HTML
  if (text.trim().toLowerCase().startsWith('<!doctype html>') || 
      text.trim().toLowerCase().startsWith('<html')) {
    console.error('Received HTML response instead of JSON:', text.substring(0, 300));
    
    // Try to extract any JSON embedded in the HTML (sometimes APIs embed error messages in HTML)
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const possibleJson = jsonMatch[0];
        return JSON.parse(possibleJson) as T;
      }
    } catch (e) {
      console.log('Failed to extract JSON from HTML');
    }
    
    // If we can't extract JSON, create a fallback response
    try {
      // Create a fallback response object that matches the expected type
      const fallbackResponse = {
        sessionId: args[0].toString().includes('sessionId=') ? 
          args[0].toString().split('sessionId=')[1]?.split('&')[0] : 
          'fallback-session',
        output: "I'm sorry, but there was an issue connecting to the server. Please check your webhook configuration.",
        messages: [{
          id: `error-${Date.now()}`,
          content: "I'm sorry, but there was an issue connecting to the server. Please check your webhook configuration.",
          role: 'assistant',
          timestamp: Date.now()
        }]
      } as unknown as T;
      
      console.log('Using fallback response:', fallbackResponse);
      return fallbackResponse;
    } catch (e) {
      // If all else fails, throw the original error
      throw new Error(`Received HTML response instead of JSON. This usually indicates an error page or incorrect API endpoint. Check your webhook URL and server configuration.`);
    }
  }
  
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    console.error('Failed to parse response:', text.substring(0, 200));
    throw new Error(`Invalid response format. Expected JSON but got: ${text.substring(0, 100)}...`);
  }
}

export async function get<T>(url: string, query: object = {}, options: RequestInit = {}) {
  let resolvedUrl = url;
  if (Object.keys(query).length > 0) {
    resolvedUrl = `${resolvedUrl}?${new URLSearchParams(
      query as Record<string, string>,
    ).toString()}`;
  }

  return await authenticatedFetch<T>(resolvedUrl, { ...options, method: 'GET' });
}

export async function post<T>(url: string, body: object = {}, options: RequestInit = {}) {
  return await authenticatedFetch<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function postWithFiles<T>(
  url: string,
  body: Record<string, unknown> = {},
  files: File[] = [],
  options: RequestInit = {},
) {
  const formData = new FormData();

  for (const key in body) {
    formData.append(key, body[key] as string);
  }

  for (const file of files) {
    formData.append('files', file);
  }

  return await authenticatedFetch<T>(url, {
    ...options,
    method: 'POST',
    body: formData,
  });
}

export async function loadPreviousSession(sessionId: string, options: ChatOptions) {
  const method = options.webhookConfig?.method === 'POST' ? post : get;
  return await method<LoadPreviousSessionResponse>(
    `${options.webhookUrl}`,
    {
      action: 'loadPreviousSession',
      [options.chatSessionKey || 'sessionId']: sessionId,
      ...(options.metadata ? { metadata: options.metadata } : {}),
    },
    {
      headers: options.webhookConfig?.headers,
    },
  );
}

export async function sendMessage(
  message: string,
  files: File[],
  sessionId: string,
  options: ChatOptions,
) {
  // Check rate limit before proceeding
  const rateLimitCheck = checkRateLimit(sessionId);
  if (!rateLimitCheck.allowed) {
    throw new ChatApiError(rateLimitCheck.error || 'Rate limit exceeded');
  }

  if (files.length > 0) {
    return await postWithFiles<SendMessageResponse>(
      `${options.webhookUrl}`,
      {
        action: 'sendMessage',
        [options.chatSessionKey || 'sessionId']: sessionId,
        [options.chatInputKey || 'input']: message,
        ...(options.metadata ? { metadata: options.metadata } : {}),
      },
      files,
      {
        headers: options.webhookConfig?.headers,
      },
    );
  }
  const method = options.webhookConfig?.method === 'POST' ? post : get;
  return await method<SendMessageResponse>(
    `${options.webhookUrl}`,
    {
      action: 'sendMessage',
      [options.chatSessionKey || 'sessionId']: sessionId,
      [options.chatInputKey || 'input']: message,
      ...(options.metadata ? { metadata: options.metadata } : {}),
    },
    {
      headers: options.webhookConfig?.headers,
    },
  );
}