import Background from './components/Background';
import BuffaloPage from './components/BuffaloPage';
import './styles/buffalo.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f9f6f2',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Background />
      <BuffaloPage />
    </div>
  );
}

export default App;
