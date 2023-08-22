const http = require('http');
const app = require('./app');
require('./models')

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server is listening port ${PORT}`);
});