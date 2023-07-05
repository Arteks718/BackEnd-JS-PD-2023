import http from 'http';
import app from './app.js';
const server = http.createServer(app);
const PORT = 5000 || process.env.PORT;
const HOST = '127.0.0.1' || process.env.HOST;
server.listen(PORT, HOST, () => {
    console.log(`Server is listening on ${HOST} on ${PORT}`);
});
