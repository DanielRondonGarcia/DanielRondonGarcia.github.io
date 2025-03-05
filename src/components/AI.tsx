import React, { useEffect, useRef, useState, useCallback } from 'react';
import ContentCard from './ContentCard';
import { sendMessage, loadPreviousSession, Message, MessageRole, ChatApiError, getPersistentSessionId } from '../utils/chatApi';
import { Toaster, toast } from 'react-hot-toast';
import ChatInterface from './ChatInterface';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sessionId: string;
  error: Error | null;
}

const INITIAL_STATE: ChatState = {
  messages: [],
  isLoading: false,
  sessionId: '',
  error: null
};

const AI: React.FC = () => {
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
      content: 'Hi! 👋',
      role: MessageRole.Assistant,
      timestamp: Date.now(),
    },
    {
      id: 'welcome-2',
      content: 'I am Daniel, what do you want to talk about?',
      role: MessageRole.Assistant,
      timestamp: Date.now() + 100,
    },
  ]);

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
    <ContentCard subtitle="AI ASSISTANT" title="ASK ME ANYTHING">
      <Toaster position="bottom-right" toastOptions={{
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
          zIndex: 99999
        },
      }} />
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        description={
          <>
            <p className="mb-4">
              Use this virtual assistant to ask me any questions about my experience, projects, or skills.
            </p>
            <p className="mb-4">
              The assistant is connected to a knowledge base about my professional profile and can answer queries related to my work.
            </p>
          </>
        }
      />
    </ContentCard>
  );
};

export default AI;