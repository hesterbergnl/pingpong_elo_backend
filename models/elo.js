const mongoose = require('mongoose')

const eloSchema = mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
      },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    },
    elo: {
        type: Number,
        required: true
    }
})

eloSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Elo = mongoose.model('Elo', eloSchema)

module.exports = Elo