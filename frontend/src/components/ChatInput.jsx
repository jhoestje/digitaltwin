import { useState } from 'react';
import { Send, Zap } from 'lucide-react';

export default function ChatInput({ onSend, onStream, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e, stream = false) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    if (stream) {
      onStream(trimmed);
    } else {
      onSend(trimmed);
    }
    setMessage('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 bg-gray-800 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-3 text-sm border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        title="Send (single response)"
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 transition-colors flex items-center gap-1.5 text-sm font-medium"
      >
        <Send size={16} />
        Send
      </button>
      <button
        type="button"
        onClick={(e) => handleSubmit(e, true)}
        disabled={disabled || !message.trim()}
        title="Stream (token-by-token)"
        className="bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 transition-colors flex items-center gap-1.5 text-sm font-medium"
      >
        <Zap size={16} />
        Stream
      </button>
    </form>
  );
}
