import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f0f0f0',
        gap: '1rem',
        padding: '2rem 1rem',
      }}
    >
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/1" element={<Page1 />} />
        <Route path="/2" element={<Page2 />} />
        <Route path="/3" element={<Page3 />} />
        <Route path="/4" element={<Page4 />} />
      </Routes>
    </div>
  );
}

export default App;
