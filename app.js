const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')

const { MONGODB_URI, PORT } = require('./config')
const { INTERNAL_SERVER_ERROR } = require('./constant')
const cors = require('./middlewares/cors')
const { limiter } = require('./middlewares/limiter')
const { errorLogger, requestLogger } = require('./middlewares/logger')
const router = require('./routes')

const app = express()

app.use(helmet())

app.use(cors)

app.use(limiter)

app.use(cookieParser())

mongoose.connect(`${MONGODB_URI}`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

app.use(router)

app.use(errorLogger)

app.use(errors())

app.use((err, req, res, next) => {
  console.log(err)
  const { statusCode = INTERNAL_SERVER_ERROR.statusCode, message } = err

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR.statusCode
        ? INTERNAL_SERVER_ERROR.text
        : message,
  })
  next()
})

app.listen(PORT)
