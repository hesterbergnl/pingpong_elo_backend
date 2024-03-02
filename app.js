const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

const matchRouter = require('./controllers/match')
const playerRouter = require('./controllers/player')
const eloRouter = require('./controllers/elo')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/match', matchRouter)
app.use('/api/player', playerRouter)
app.use('/api/elo', eloRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app