const eloRouter = require('express').Router()
const Elo = require('../models/elo')
const Player = require('../models/player')
const Match = require('../models/match')

eloRouter.get('/', async (req, res) => {
  const elos = await Elo
    .find({}).populate('player', {name: 1}).populate('match')
  res.json(elos)
})

eloRouter.get('/:player', async (req, res) => {
  const playerObject = await Player.findById(req.params.player)
  
  const elo = await Elo
    .find({ player: playerObject })
  
  if (elo) {
    res.json(elo)
  } else {
    res.status(404).end()
  }
})

eloRouter.get('/:id', async (req, res) => {
  const  elo  = await Elo
    .findById(req.params.id)
  if (elo) {
    res.json(elo)
  } else {
    res.status(404).end()
  }
})

eloRouter.post('/', async (req, res) => {
  const {player, match, elo} = req.body

  const playerObject = await Player.findById(player)
  const matchObject = await Match.findById(match)

  console.log(playerObject)
  console.log(matchObject)

  const eloObject = new Elo ({
    player: playerObject._id,
    match: matchObject === null ? null : matchObject._id,
    elo: elo
  })

  const newElo = await eloObject.save()

  res.status(201).json(newElo)
})

eloRouter.delete('/:id', async (req, res) => {
  await Elo.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = eloRouter
