"use strict";
const http = require('http');
const APP = require('./app.js');
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const server = http.createServer(APP);
server.listen(PORT, HOST, () => {
    console.log(`Server listening on port ${PORT} for ${HOST}`);
});
