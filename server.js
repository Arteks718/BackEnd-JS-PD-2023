"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const APP = require('./app.js');
const axios = require('axios');
require('dotenv').config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const server = http.createServer(APP);
server.listen(PORT, HOST, () => {
    console.log(`Server listening on port ${PORT} for ${HOST}`);
});
let productsDB = [];
const productsFetch = axios.get('https://fakestoreapi.com/products')
    .then((res) => {
    productsDB.push(res);
})
    .catch((err) => console.log(err));
console.log(productsDB);
