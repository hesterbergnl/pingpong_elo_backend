const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  elo: {
    type: Number,
    required: true
  }
})

playerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

playerSchema.path('name').validate(async (value) => {
  const playerCount = await mongoose.models.Player.countDocuments({name: value });
  return !playerCount;
}, 'Player name already exists');

const Player = mongoose.model('Player', playerSchema)

module.exports = Player