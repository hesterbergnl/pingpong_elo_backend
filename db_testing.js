require('dotenv').config()
const mongoose = require('mongoose')
const Match = require('./models/match')
const Player = require('./models/player')
const Elo = require('./models/elo')
const port = process.env.PORT
const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

console.log(`connecting to ${url}`)

mongoose.connect(url)
  .then(result => {
      console.log('connected to MongoDB')
  })
  .catch(error => {
      console.log(`error connecting to MongoDB: ${error.message}`)
  })

const nh = new Player({
  name: 'nh'
})

const pc = new Player({
  name: 'pc'
})

nh.save().then(result => {
  console.log(result)
  pc.save().then(result=>{
    console.log(result)

    const match = new Match({
      date: Date(),
      p1: pc,
      p2: nh,
      s1: 11,
      s2: 7,
      elo1: 1200,
      elo2: 1400
    }) 
    
    match.save().then(result => {
      console.log('match saved!')

      const elo = new Elo({
        match: match,
        player: nh,
        elo: 100
      })

      elo.save().then(result => {
        console.log(result)
        mongoose.connection.close()
      })
    })
  })
})


