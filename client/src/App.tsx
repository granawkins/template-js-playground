import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import mentatLogo from '/mentat.png';
import Background from './components/Background';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WebSocket states
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [echoMessages, setEchoMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchBackendMessage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  // WebSocket connection
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    newSocket.on('echo', (echoMessage: string) => {
      setEchoMessages((prev) => [...prev, echoMessage]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim()) {
      socket.emit('echo', inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f0f0',
        gap: '1rem',
      }}
    >
      <Background />
      <div>
        <a href="https://mentat.ai" target="_blank">
          <img src={mentatLogo} className="logo" alt="Mentat logo" />
        </a>
      </div>
      <h1>Mentat Template JS</h1>
      <ul>
        <li>Frontend: React, Vite, Vitest</li>
        <li>Backend: Node.js, Express, Jest</li>
        <li>Utilities: Typescript, ESLint, Prettier</li>
      </ul>
      <p>
        <b>Message from server:</b>{' '}
        {loading
          ? 'Loading message from server...'
          : error
            ? `Error: ${error}`
            : message
              ? message
              : 'No message from server'}
      </p>

      {/* WebSocket Echo Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: 'white',
          minWidth: '400px',
          maxWidth: '600px',
        }}
      >
        <h3>WebSocket Echo</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
          Connection Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message to echo..."
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
            disabled={!isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isConnected ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isConnected ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
            }}
          >
            Send
          </button>
        </div>

        {/* Echo Messages Display */}
        <div
          style={{
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #eee',
            borderRadius: '4px',
            padding: '0.5rem',
            backgroundColor: '#f9f9f9',
          }}
        >
          {echoMessages.length === 0 ? (
            <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>
              No messages yet. Send a message to see it echoed back!
            </p>
          ) : (
            echoMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  padding: '0.25rem 0',
                  borderBottom:
                    index < echoMessages.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                <strong>Echo:</strong> {msg}
              </div>
            ))
          )}
        </div>
      </div>

      <p>Create a new GitHub issue at tag '@MentatBot' to get started.</p>
    </div>
  );
}

export default App;
