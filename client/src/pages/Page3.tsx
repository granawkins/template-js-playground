import Background from '../components/Background';

function Page3() {
  return (
    <>
      <Background />
      <h1>🎨 Page 3 - Features</h1>
      <div
        style={{
          maxWidth: '600px',
          textAlign: 'left',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '12px',
          margin: '2rem 0',
        }}
      >
        <h2>Template Features</h2>
        <p>
          This template comes packed with modern web development tools and
          features.
        </p>
        <h3>Frontend Features:</h3>
        <ul>
          <li>⚛️ React 19 with TypeScript</li>
          <li>⚡ Vite for fast development and building</li>
          <li>🧪 Vitest for unit testing</li>
          <li>🎨 Beautiful gradient background</li>
          <li>📱 Responsive design</li>
        </ul>
        <h3>Backend Features:</h3>
        <ul>
          <li>🚀 Express.js server</li>
          <li>📝 TypeScript support</li>
          <li>🔄 Hot reloading with ts-node-dev</li>
          <li>🧪 Jest for testing</li>
          <li>🌐 CORS enabled</li>
        </ul>
        <h3>Development Tools:</h3>
        <ul>
          <li>🔍 ESLint for code quality</li>
          <li>💅 Prettier for code formatting</li>
          <li>🤖 Mentat AI integration</li>
        </ul>
      </div>
    </>
  );
}

export default Page3;
