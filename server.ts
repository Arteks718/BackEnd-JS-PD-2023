const http = require('http');
const APP  = require('./app.js');
require('dotenv').config();

type PortHost = string | undefined;
const PORT:PortHost = process.env.PORT
const HOST:PortHost = process.env.HOST

const server = http.createServer(APP)
server.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT} for ${HOST}`)
})

