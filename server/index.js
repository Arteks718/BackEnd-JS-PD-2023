const http = require('http')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 5000

const server = http.createServer(() => {})
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`)
})