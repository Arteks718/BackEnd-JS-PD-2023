import http from 'http';
import app from './app.js';
import 'dotenv/config';
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';
const server = http.createServer(app);
server.listen(Number(PORT), HOST, () => {
    console.log(`Server listening on port ${PORT} for ${HOST}`);
});
