const http = require('http');
const APP  = require('./app.js');
const axios = require('axios');
require('dotenv').config();

type PortHost = string | undefined;
const PORT:PortHost = process.env.PORT
const HOST:PortHost = process.env.HOST

const server = http.createServer(APP)
server.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT} for ${HOST}`)
})

class Test {
  async getTest() {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products');
      // const response = await axios.get('https://fakestoreapi.com/products');
      return data
    } catch (error) {
      console.log(error);
      throw error; // Викидаємо помилку, щоб обробити її у контролері
    }
  }
}

const test = new Test();

// test.getTest()
//   .then((response) => {console.log(response)})