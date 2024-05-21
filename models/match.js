require('dotenv').config()
const mongoose = require('mongoose')

const scoreValidator = (value) => {
  console.log(value)
  console.log(this.s2)
  console.log('abs validator', Math.abs(value - this.s2))
  if (value < 11 && this.s2 < 11) {
    return false
  }
  else if (Math.abs(value - this.s2) <= 2) {
    return false
  }
  else {
    return true
  }
}

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
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

matchSchema.path('s1').validate(function(value) {
  if (value < 11 && this.get('s2') < 11) {
    return false
  }
  else if (Math.abs(value - this.get('s2')) <= 2) {
    return false
  }
  else {
    return true
  }
})

matchSchema.path('p1').validate(function(value) {
  if (value.toString() === this.get('p2').toString()) {
    return false
  }
  else {
    return true
  }
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match