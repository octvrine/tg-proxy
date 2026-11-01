const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/', createProxyMiddleware({
  target: 'https://api.telegram.org',
  changeOrigin: true,
  secure: true
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy running on port ${PORT}`);
});
