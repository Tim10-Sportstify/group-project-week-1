const cors = require('cors');
const express = require('express');
const router = require('./routes');
const errHanlder = require('./middlewares/errorsHandler')
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)
app.use(errHanlder)

app.listen(PORT, () => {
  console.log(`Sportstify is running on http://localhost:${PORT}`)
})
