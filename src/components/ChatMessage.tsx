import React from 'react';

type MessageRole = 'user' | 'assistant';

interface ChatMessageProps {
  content: string;
  role: MessageRole;
  timestamp: string;
}

export function ChatMessage({ content, role, timestamp }: ChatMessageProps) {
  return (
    <div className={`p-4 rounded-lg ${role === 'user' ? 'bg-blue-100 ml-12' : 'bg-gray-100 mr-12'} mb-4`}>
      <div className="flex items-start">
        <div className="flex-grow">
          <p className="text-gray-800">{content}</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(timestamp).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}