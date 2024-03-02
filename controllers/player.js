const playerRouter = require('express').Router()
const Player = require('../models/player')

playerRouter.post('/', async (req, res) => {
  const {name} = req.body

  const player = new Player({
    name: name
  })

  const newPlayer = await player.save()

  res.status(201).json(newPlayer)
})

playerRouter.get('/', async (req, res) => {
  const players = await Player
    .find({})
  res.json(players)
})

playerRouter.get('/:id', async (req, res) => {
  const  player = await Player
    .findById(req.params.id)
  if (player) {
    res.json(player)
  } else {
    res.status(404).end()
  }
})

playerRouter.delete('/:id', async (req, res) => {
  await Player.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = playerRouter