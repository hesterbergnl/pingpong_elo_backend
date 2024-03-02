const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  elo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Elo'
    }
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match'
    }
  ]
})

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player