require('dotenv').config()
const Match = require('./models/match')
const Player = require('./models/player')

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
