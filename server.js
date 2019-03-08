const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, './app'), { maxAge: 86400000 }))
app.use(bodyParser())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.send(500, 'Something broke!')
})

// Render the app
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, './app/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Listening on ' + port)
})
