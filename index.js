
require('dotenv').config()
const express = require('express')
const app = express()
const port = 9000
const mongoose = require('mongoose')
const subscriberRouter = require('./routes/subscribers')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection 
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to DatabaseSuccessfully!!!'))


app.use(express.json())

app.use('/api', subscriberRouter)
app.listen(port, () => console.log('App listening on port 9000'))