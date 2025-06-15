const http = require('http');
const path = require('path');

const PORT = 8080;

// Simple HTML content
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World Server</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>This is a simple HTML server running on port ${PORT}</p>
        <p>Server started at: ${new Date().toISOString()}</p>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Set headers for HTML content
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });

  // Send the HTML content
  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`HTML Server running at http://localhost:${PORT}`);
  console.log(`Started at: ${new Date().toISOString()}`);
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\nShutting down HTML server...');
  server.close(() => {
    console.log('HTML server closed');
    process.exit(0);
  });
});
