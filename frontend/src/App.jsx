import { useState, useEffect, useRef } from 'react';
import { Bot, Trash2 } from 'lucide-react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import StatusBadge from './components/StatusBadge';
import { getStatus, generateResponse, generateStreamResponse } from './api/digitalTwin';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);
  const [statusError, setStatusError] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getStatus()
      .then((data) => {
        setBackendStatus(data.status);
        setStatusError(false);
      })
      .catch(() => setStatusError(true));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (role, content) => {
    setMessages((prev) => [...prev, { id: Date.now(), role, content, isStreaming: false }]);
  };

  const handleSend = async (message) => {
    addMessage('user', message);
    setLoading(true);

    try {
      const data = await generateResponse(message);
      addMessage('assistant', data.generation);
    } catch (err) {
      addMessage('assistant', `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStream = async (message) => {
    addMessage('user', message);
    setLoading(true);

    const streamMsgId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: streamMsgId, role: 'assistant', content: '', isStreaming: true },
    ]);

    await generateStreamResponse(
      message,
      (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === streamMsgId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      },
      () => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === streamMsgId ? { ...msg, isStreaming: false } : msg
          )
        );
        setLoading(false);
      },
      (err) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === streamMsgId
              ? { ...msg, content: `Error: ${err.message}`, isStreaming: false }
              : msg
          )
        );
        setLoading(false);
      }
    );
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Digital Twin AI</h1>
              <StatusBadge status={backendStatus} error={statusError} />
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-800"
              title="Clear chat"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Bot size={32} className="text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-300 mb-2">
                Digital Twin Assistant
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Send a message to start a conversation. Use <strong>Send</strong> for
                a complete response or <strong>Stream</strong> to see tokens arrive
                in real time.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={msg.isStreaming}
            />
          ))}

          {loading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-green-400">
                <Bot size={16} />
              </div>
              <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ChatInput onSend={handleSend} onStream={handleStream} disabled={loading} />
        </div>
      </footer>
    </div>
  );
}

export default App;
