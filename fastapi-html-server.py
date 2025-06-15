from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from datetime import datetime
import uvicorn

app = FastAPI(title="FastAPI HTML Server", description="Simple HTML server using FastAPI")

PORT = 8082

# HTML content template
def get_html_content():
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FastAPI Hello World Server</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }}
        .container {{
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }}
        h1 {{
            color: #333;
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }}
        p {{
            color: #666;
            font-size: 1.1rem;
            margin: 0.5rem 0;
        }}
        .badge {{
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-top: 1rem;
        }}
        .server-info {{
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            font-family: monospace;
            font-size: 0.9rem;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <div class="badge">FastAPI Server</div>
        <p>This is a FastAPI HTML server running on port {PORT}</p>
        <div class="server-info">
            <p><strong>Server started:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
            <p><strong>Framework:</strong> FastAPI + Uvicorn</p>
            <p><strong>Request time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
        </div>
        <p>🚀 FastAPI is fast, modern, and developer-friendly!</p>
    </div>
</body>
</html>
"""

@app.get("/", response_class=HTMLResponse)
async def read_root():
    """Serve the main HTML page"""
    print(f"{datetime.now().isoformat()} - GET / (FastAPI)")
    return get_html_content()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    print(f"{datetime.now().isoformat()} - GET /health (FastAPI)")
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/info")
async def server_info():
    """Server information endpoint"""
    print(f"{datetime.now().isoformat()} - GET /info (FastAPI)")
    return {
        "server": "FastAPI HTML Server",
        "port": PORT,
        "framework": "FastAPI",
        "started_at": datetime.now().isoformat(),
        "endpoints": ["/", "/health", "/info", "/docs"]
    }

if __name__ == "__main__":
    print(f"FastAPI HTML Server starting on http://localhost:{PORT}")
    print(f"Started at: {datetime.now().isoformat()}")
    print("Available endpoints:")
    print("  - GET /      - Main HTML page")
    print("  - GET /health - Health check")
    print("  - GET /info  - Server info")
    print("  - GET /docs  - FastAPI auto-generated docs")
    
    uvicorn.run(
        "fastapi-html-server:app",
        host="0.0.0.0",
        port=PORT,
        reload=False,
        log_level="info"
    )
