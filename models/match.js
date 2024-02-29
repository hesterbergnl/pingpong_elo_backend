require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL

console.log(`connecting to ${url}`)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log(`error connecting to MongoDB: ${error.message}`)
    })

//TODO: Add some more complex validation for Pingpong scores
const matchSchema = new mongoose.Schema({
    date: Date,
    p1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true
    },
    p2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true
    },
    s1: {
      type: Number,
      required: true
    },
    s2: {
      type: Number,
      required: true
    },
    elo1: {
      type: Number,
      required: true
    },
    elo2: {
      type: Number,
      required: true
    } 
})

matchSchema.set('toJSON', {
    transform: (document, returnedObject => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject_v
    })
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match