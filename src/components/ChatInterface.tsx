import React, { useRef, useState, useCallback } from 'react';
import { Message, MessageRole } from '../utils/chatApi';
import { toast } from 'react-hot-toast';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  description?: React.ReactNode;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  inputValue,
  setInputValue,
  handleSendMessage,
  description
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="mb-8">
      {description && description}
      <div 
        id="chat-container" 
        ref={chatContainerRef}
        className="w-full h-[70vh] min-h-[300px] bg-gray-900 rounded-lg overflow-hidden flex flex-col"
      >
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block p-2 md:p-3 rounded-lg text-sm md:text-base ${message.role === 'user' 
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
              className="flex-1 p-1.5 md:p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none text-sm md:text-base"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-[var(--primary-color-600)] text-white px-2 py-1.5 md:px-4 md:py-2 rounded-r-lg hover:bg-[var(--primary-color-700)] transition-colors text-sm md:text-base"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;