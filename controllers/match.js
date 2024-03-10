const matchRouter = require('express').Router()
const Match = require('../models/match')
const Player = require('../models/player')

matchRouter.get('/', async (req, res) => {
  const matches = await Match
    .find({}).populate('p1', { name: 1 }).populate('p2', { name: 1 })
  res.json(matches)
})

matchRouter.get('/:player', async (req, res) => {
  const playerObject = await Player.findById(req.params.player)
  
  const match = await Match
    .find({ $or:[ {'p1':playerObject}, {'p2':playerObject} ]})
    .populate('p1', { name: 1 }).populate('p2', { name: 1 })
  
  if (match) {
    res.json(match)
  } else {
    res.status(404).end()
  }
})

matchRouter.get('/:id', async (req, res) => {
  const  match  = await Match
    .findById(req.params.id).populate('p1', { name: 1 }).populate('p2', { name: 1 })
  if (match) {
    res.json(match)
  } else {
    res.status(404).end()
  }
})

matchRouter.post('/', async (req, res) => {
  const {date, p1, p2, s1, s2, elo1, elo2} = req.body

  const player1 = await Player.findById(p1)
  const player2 = await Player.findById(p2)

  console.log(player1)
  console.log(player2)

  const match = new Match ({
    date: date,
    p1: player1._id,
    p2: player2._id,
    s1: s1,
    s2: s2,
    elo1: elo1,
    elo2: elo2
  })

  const newMatch = await (await (await match.save()).populate('p1')).populate('p2')
  //const populatedMatch = await newMatch.populate()

  res.status(201).json(newMatch)
})

matchRouter.delete('/:id', async (req, res) => {
  await Match.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = matchRouter