const mongoose = require('mongoose')

const eloSchema = mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
      },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    elo: {
        type: Number,
        required: true
    }
})