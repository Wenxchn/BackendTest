const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const app = express()
const ApiRouter = require('./routes/api')
const AccountRouter = require('./routes/account')
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500)
    res.send('Bad Things Happened')
  }
    next()
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['HashingBasically'],
    maxAge: 24 * 60 * 60 * 1000 //24 hours worth of miliseconds
  })
)

app.use('/api', ApiRouter)
app.use('/account', AccountRouter)
app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening to 3000')
})