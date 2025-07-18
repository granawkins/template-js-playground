const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple Server</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background-color: #f0f0f0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          color: #666;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Simple Server on Port 5432</h1>
        <p>This is a basic HTTP server serving HTML content.</p>
        <p>Server started at: ${new Date().toISOString()}</p>
        <p>Request URL: ${req.url}</p>
        <p>Request Method: ${req.method}</p>
        <p>User Agent: ${req.headers['user-agent'] || 'Unknown'}</p>
      </div>
    </body>
    </html>
  `);
});

const PORT = 5432;
server.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
});
