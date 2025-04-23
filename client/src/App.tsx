import Background from './components/Background';
import BuffaloPage from './components/BuffaloPage';

function App() {
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
        overflow: 'auto',
        padding: '2rem 1rem',
      }}
    >
      <Background />
      <BuffaloPage />
    </div>
  );
}

export default App;
