const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controllers/villains')

app.get('/villains', getAllVillains)
app.get('/villains/:slug', getVillainBySlug)
app.post('/villains', bodyParser.json(), saveNewVillain)

app.all('*', (request, response) => {
  return response.sendStatus(400)
})
app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
