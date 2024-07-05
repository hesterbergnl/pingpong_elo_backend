const playerRouter = require('express').Router()
const config = require('../utils/config')
const Player = require('../models/player')
const jwt = require('jsonwebtoken')
const multer = require('multer')
var fs = require('fs')

//setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

playerRouter.post('/', upload.single('photo'), async (req, res) => {
  const {name, elo} = req.body
  console.log(req.file)

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)                         
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  var photo = config.DEFAULT_IMG

  console.log(req.file)

  if (req.file) {
    photo = req.file.originalname
  }
  
  const player = new Player({
    name: name,
    elo: elo,
    photo: photo,
  })

  const newPlayer = await player.save()

  res.status(201).json(newPlayer)
})

playerRouter.put('/:id', async (req, res) => {
  const body = req.body

  const player = {
    name: body.name,
    elo: body.elo
  }

  const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, player, { new: true })
  res.status(201).json(updatedPlayer)
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
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)                         
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const player = await Player.findById(req.params.id)
  if(player.photo !== null && player.photo !== 'default-image.jpeg') {
    const oldPath = 'uploads/' + player.photo
    if (fs.existsSync(oldPath)) {
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.error(err);
        }
      })
    }
  }

  await Player.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

module.exports = playerRouter