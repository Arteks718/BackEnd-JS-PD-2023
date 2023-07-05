import express from 'express'
const app = express();
app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
  // console.log('Hello answer!: ', req)
  res.status(200).end();
})

app.get('/users/', (req, res) => {})

app.get('/users/id', (req, res) => {})

app.post('/users', (req, res) => {
  const { body }  = req;
  console.log(body);
  res.status(201).send(body);
})

app.put('/users/id', (req, res) => {})

app.delete('/users/id', (req, res) => {})

export default app;

