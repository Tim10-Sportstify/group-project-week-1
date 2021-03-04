
const cors = require('cors');
const express = require('express');
const app = express()
const PORT = 3000
const router = require('./routes/index');


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)
app.listen(PORT, () => {
  console.log(`Sportstify is running on http://localhost:${PORT}`)
})