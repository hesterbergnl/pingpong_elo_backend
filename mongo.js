const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nikolai:${password}@clusternh.yrck8hv.mongodb.net/pingpong?retryWrites=true&w=majority&appName=ClusterNH`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const matchSchema = new mongoose.Schema({
  date: Date,
  p1: String,
  p2: String,
  s1: Number,
  s2: Number,
  elo1: Number,
  elo2: Number
})

const Match = mongoose.model('Match', matchSchema)

const match = new Match({
  date: Date(),
  p1: 'nh',
  p2: 'pc',
  s1: 11,
  s2: 7,
  elo1: 0,
  elo2: 0
})

match.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})