import Background from '../components/Background';

function Page2() {
  return (
    <>
      <Background />
      <h1>⚙️ Page 2 - Configuration</h1>
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
        <h2>Configuration Options</h2>
        <p>
          This page covers various configuration options available in the
          template.
        </p>
        <h3>Available Scripts:</h3>
        <ul>
          <li>
            <code>npm run dev</code> - Start development servers
          </li>
          <li>
            <code>npm run build</code> - Build for production
          </li>
          <li>
            <code>npm run test</code> - Run test suites
          </li>
          <li>
            <code>npm run lint</code> - Check code quality
          </li>
          <li>
            <code>npm run format</code> - Format code with Prettier
          </li>
        </ul>
        <h3>Environment Setup:</h3>
        <p>
          The project uses TypeScript, ESLint, and Prettier for a consistent
          development experience. All configurations are pre-configured and
          ready to use!
        </p>
      </div>
    </>
  );
}

export default Page2;
