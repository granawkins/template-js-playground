const http = require('http');

const PORT = 8081;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Set headers for JSON content
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  // Return empty JSON body for all requests
  const response = {};
  res.end(JSON.stringify(response, null, 2));
});

server.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`);
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log('Returns empty JSON {} for all requests');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\nShutting down JSON server...');
  server.close(() => {
    console.log('JSON server closed');
    process.exit(0);
  });
});
