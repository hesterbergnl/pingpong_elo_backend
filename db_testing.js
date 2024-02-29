require('dotenv').config()
const mongoose = require('mongoose')
const Match = require('./models/match')
const Player = require('./models/player')
const Elo = require('./models/elo')
const port = process.env.PORT
const url = process.env.URL

mongoose.set('strictQuery', false)

console.log(`connecting to ${url}`)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log(`error connecting to MongoDB: ${error.message}`)
    })

const match = new match({
  date: Date(),
  p1: 'nh',
  p2: 'pc',
  s1: 11,
  s2: 7,
  elo1: 1200,
  elo2: 1400
}) 

match.save().then(result => {
  console.log('match saved!')
})

mongoose.connection.close()
