import http from 'http'

let k:number = 0;
const requestListener = (req:http.IncomingMessage, res:http.ServerResponse) => {
  const {url, method} = req;
  console.log('client request: ', url, method);
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>Hello world!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas facilis, harum dolor eligendi earum unde blanditiis perferendis dolorum id amet.</p>
  </body>
  </html>`)
  // res.end(`Hello, client! it is message #${k++/2}`);
}

export { requestListener }
