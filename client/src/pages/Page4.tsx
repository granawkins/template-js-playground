import Background from '../components/Background';

function Page4() {
  return (
    <>
      <Background />
      <h1>📚 Page 4 - Resources</h1>
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
        <h2>Helpful Resources</h2>
        <p>
          Here are some useful links and resources to help you get the most out
          of this template.
        </p>
        <h3>Documentation:</h3>
        <ul>
          <li>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Documentation
            </a>
          </li>
          <li>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Documentation
            </a>
          </li>
          <li>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeScript Documentation
            </a>
          </li>
          <li>
            <a
              href="https://expressjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Express.js Documentation
            </a>
          </li>
        </ul>
        <h3>Mentat AI:</h3>
        <ul>
          <li>
            <a
              href="https://mentat.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentat AI Website
            </a>
          </li>
          <li>
            <a
              href="https://mentat.ai/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentat Documentation
            </a>
          </li>
        </ul>
        <p>
          <strong>Need help?</strong> Create a GitHub issue and tag '@MentatBot'
          for AI-powered assistance!
        </p>
      </div>
    </>
  );
}

export default Page4;
