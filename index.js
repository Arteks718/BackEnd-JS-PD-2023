import http from 'http';
import { requestListener } from './requestListener.js';
const HOST = '127.0.0.1';
const PORT = 3000;
const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is listening on host ${HOST} on ${PORT} port`);
});
