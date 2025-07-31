import Background from '../components/Background';

function Page1() {
  return (
    <>
      <Background />
      <h1>🚀 Page 1 - Getting Started</h1>
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
        <h2>Welcome to Page 1!</h2>
        <p>
          This is the first page in our multi-page application. Here you can
          find information about getting started with the project.
        </p>
        <h3>Quick Start Guide:</h3>
        <ol>
          <li>Clone the repository</li>
          <li>
            Run <code>npm install</code>
          </li>
          <li>
            Start development with <code>npm run dev</code>
          </li>
          <li>Open your browser and start coding!</li>
        </ol>
        <p>
          <strong>Pro tip:</strong> Use the navigation buttons above to explore
          all the different pages!
        </p>
      </div>
    </>
  );
}

export default Page1;
