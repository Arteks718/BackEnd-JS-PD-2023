"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
class Test {
    getTest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios.get('https://fakestoreapi.com/products');
                // const response = await axios.get('https://fakestoreapi.com/products');
                return data;
            }
            catch (error) {
                console.log(error);
                throw error; // Викидаємо помилку, щоб обробити її у контролері
            }
        });
    }
}
const test = new Test();
// test.getTest()
//   .then((response) => {console.log(response)})
