export default async function handler(req, res) {
  const { path = [] } = req.query;
  const queryString = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const targetUrl = `https://api.telegram.org/${Array.isArray(path) ? path.join('/') : path}${queryString}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'content-type': req.headers['content-type'] || 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : undefined,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(502).json({ error: 'Proxy error', details: error.message });
  }
}
