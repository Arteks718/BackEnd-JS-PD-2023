const http = require('http')
const app = require('./app.js')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 5000

const server = http.createServer(app)
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`)
})