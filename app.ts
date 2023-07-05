import express from 'express'
import path from 'path'
const app = express();
app.use(express.json())
app.use('/', express.static("public"))

app.use('*', (req, res) => {
  const __dirname = 'public'
  res.status(404).sendFile(path.resolve(__dirname, '404.html'));
})

export default app;

