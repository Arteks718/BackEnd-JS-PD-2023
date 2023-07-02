import http from 'http';
import fs from 'fs';
import { requestListener } from './requestListener.js'

const HOST:string = '127.0.0.1';
const PORT:number = 3000;

const server:http.Server = http.createServer(requestListener)
server.listen(PORT, HOST, () => {
  console.log(`Server is listening on host ${HOST} on ${PORT} port`)
});