import React, { useEffect, useRef, useState, useCallback } from 'react';
import ContentCard from './ContentCard';
import { sendMessage, loadPreviousSession, Message, MessageRole, ChatApiError, getPersistentSessionId } from '../utils/chatApi';
import { Toaster, toast } from 'react-hot-toast';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sessionId: string;
  error: Error | null;  // Change error type to Error | null
}

const INITIAL_STATE: ChatState = {
  messages: [],
  isLoading: false,
  sessionId: '',
  error: null
};

const AI: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [{ messages, isLoading, sessionId, error }, setState] = useState<ChatState>(INITIAL_STATE);
  const [inputValue, setInputValue] = useState('');

  // Chat configuration
  const chatOptions = useRef({
    webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL || '',
    chatSessionKey: 'sessionId',
    chatInputKey: 'chatInput',
    webhookConfig: {
      method: 'POST' as const,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });

  // Initial welcome messages
  const initialMessages = useRef<Message[]>([
    {
      id: 'welcome-1',
      content: '¡Hola! 👋',
      role: MessageRole.Assistant,
      timestamp: Date.now(),
    },
    {
      id: 'welcome-2',
      content: 'Soy el asistente virtual de Daniel. ¿En qué puedo ayudarte hoy?',
      role: MessageRole.Assistant,
      timestamp: Date.now() + 100,
    },
  ]);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Initialize chat
  useEffect(() => {
    if (!sessionId) {
      // Get persistent session ID or create a new one
      const persistentSessionId = getPersistentSessionId();
      
      setState(prev => ({
        ...prev,
        sessionId: persistentSessionId,
        messages: initialMessages.current
      }));
    }
  }, [sessionId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle sending a message
  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: trimmedInput,
      role: MessageRole.User,
      timestamp: Date.now(),
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));
    setInputValue('');
    
    try {
      const response = await sendMessage(trimmedInput, [], sessionId, chatOptions.current);
      
      setState(prev => {
        const newMessages = response.messages?.length > 0
          ? [...prev.messages, ...response.messages.filter(msg => 
              !prev.messages.some(existingMsg => existingMsg.id === msg.id)
            )]
          : [...prev.messages, {
              id: `assistant-${Date.now()}`,
              content: response.output,
              role: MessageRole.Assistant,
              timestamp: Date.now(),
            }];

        return {
          ...prev,
          messages: newMessages,
          isLoading: false
        };
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      if (error instanceof ChatApiError) {
        toast.error(error.message, {
          icon: '⚠️',
        });
      } else {
        toast.error('Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.', {
          icon: '❌',
        });
      }

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          id: `error-${Date.now()}`,
          content: error instanceof ChatApiError
            ? error.message
            : 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.',
          role: MessageRole.Assistant,
          timestamp: Date.now(),
        }],
        isLoading: false,
        error: error instanceof Error ? error : new Error('Unknown error occurred')
      }));
    }
  }, [inputValue, isLoading, sessionId]);

  return (
    <ContentCard subtitle="AI ASSISTANT" title="PREGÚNTAME LO QUE QUIERAS">
      <Toaster position="top-right" toastOptions={{
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
          zIndex: 9999
        },
      }} />
      <div className="mb-8">
        <p className="mb-4">
          Utiliza este asistente virtual para hacerme cualquier pregunta sobre mi experiencia, proyectos o habilidades.
        </p>
        <p className="mb-4">
          El asistente está conectado a una base de conocimiento sobre mi perfil profesional y puede responder consultas relacionadas con mi trabajo.
        </p>
        <div 
          id="n8n-chat-container" 
          ref={chatContainerRef}
          className="w-full h-[500px] bg-gray-900 rounded-lg overflow-hidden flex flex-col"
        >
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg ${message.role === 'user' 
                    ? 'bg-[var(--primary-color-600)] text-white' 
                    : 'bg-gray-800 text-white'}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-800 text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[var(--primary-color-600)] text-white px-4 py-2 rounded-r-lg hover:bg-[var(--primary-color-700)] transition-colors"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContentCard>
  );
};

export default AI;