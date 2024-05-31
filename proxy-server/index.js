import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Middleware to handle preflight OPTIONS requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        return res.sendStatus(200);
    }
    next();
});

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8000',  
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.url);
    },
    onProxyRes: function (proxyRes, req, res) {
        console.log('Received response:', proxyRes.statusCode);
        proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'; 
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    },
}));

app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});
