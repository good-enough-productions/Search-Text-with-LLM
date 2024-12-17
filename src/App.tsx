import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        content: `I received your message: "${content}". This is a simulated response.`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 h-screen flex flex-col">
        <div className="bg-white rounded-lg shadow-lg flex flex-col flex-grow">
          {/* Header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-blue-500" />
              <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}
          </div>

          {/* Input */}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;