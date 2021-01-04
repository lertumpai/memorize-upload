const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const upload = require('./upload')

const app = express()

app.use(
  cors(),
  bodyParser.json({ limit: '15mb' }),
  bodyParser.urlencoded({ extended: true }),
)
app.use(express.static('public'))

app.use('/upload', upload)
app.get('/test', (req, res) => {
  res.send({ message: 'hello world', url: process.env.SERVER_URL || 'localhost:4000'  })
})

app.listen({ port: 4000 }, () => {
  console.log('Server ready at http://localhost:4000')
})
