import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  };

  const buttonStyle = (isActive: boolean) => ({
    padding: '0.75rem 1.5rem',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : '#333',
    border: '2px solid #007bff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={buttonStyle(location.pathname === '/')}>
        Home
      </Link>
      <Link to="/1" style={buttonStyle(location.pathname === '/1')}>
        Page 1
      </Link>
      <Link to="/2" style={buttonStyle(location.pathname === '/2')}>
        Page 2
      </Link>
      <Link to="/3" style={buttonStyle(location.pathname === '/3')}>
        Page 3
      </Link>
      <Link to="/4" style={buttonStyle(location.pathname === '/4')}>
        Page 4
      </Link>
    </nav>
  );
};

export default Navigation;
