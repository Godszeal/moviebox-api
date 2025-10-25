
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from web/dist
app.use(express.static(path.join(__dirname, 'web/dist')));

// Proxy API requests to FastAPI backend
app.use('/api', createProxyMiddleware({
  target: 'http://127.0.0.1:8000',
  changeOrigin: true
}));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
