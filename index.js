const express = require('express')
const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let matches  = [
  {id:1, date: Date('February 22, 2024 15:30:00'), p1:'nh', p2:'pc', s1:10, s2:12, elo1:0, elo2:0},
  {id:2, date: Date('February 22, 2024 15:35:00'), p1:'nh', p2:'pc', s1:16, s2:14, elo1:0, elo2:0},
  {id:3, date: Date('February 22, 2024 15:40:00'), p1:'nh', p2:'pc', s1:11, s2:6, elo1:0, elo2:0},
  {id:4, date: Date('February 22, 2024 15:50:00'), p1:'nh', p2:'pc', s1:11, s2:8, elo1:0, elo2:0},
  {id:5, date: Date('February 22, 2024 16:30:00'), p1:'nh', p2:'pc', s1:8, s2:11, elo1:0, elo2:0},
  {id:6, date: Date('February 22, 2024 16:35:00'), p1:'nh', p2:'pc', s1:11, s2:4, elo1:0, elo2:0},
  {id:7, date: Date('February 22, 2024 16:40:00'), p1:'nh', p2:'pc', s1:11, s2:9, elo1:0, elo2:0},
  {id:8, date: Date('February 22, 2024 16:50:00'), p1:'nh', p2:'pc', s1:8, s2:11, elo1:0, elo2:0},
  {id:9, date: Date('February 22, 2024 16:55:00'), p1:'rh', p2:'pc', s1:7, s2:11, elo1:0, elo2:0},
  {id:10, date: Date('February 22, 2024 17:05:00'), p1:'rh', p2:'nh', s1:9, s2:11, elo1:0, elo2:0},
  {id:11, date: Date('February 22, 2024 17:15:00'), p1:'nh', p2:'pc', s1:10, s2:12, elo1:0, elo2:0},
  {id:12, date: Date('February 22, 2024 17:25:00'), p1:'nh', p2:'jg', s1:11, s2:7, elo1:0, elo2:0},
  {id:13, date: Date('February 22, 2024 17:38:00'), p1:'jg', p2:'pc', s1:11, s2:7, elo1:0, elo2:0},
  {id:14, date: Date('February 23, 2024 15:30:00'), p1:'jg', p2:'rh', s1:11, s2:9, elo1:0, elo2:0},
  {id:15, date: Date('February 23, 2024 15:35:00'), p1:'nh', p2:'pc', s1:11, s2:6, elo1:0, elo2:0},
  {id:16, date: Date('February 23, 2024 15:40:00'), p1:'nh', p2:'jg', s1:11, s2:4, elo1:0, elo2:0},
  {id:17, date: Date('February 23, 2024 15:48:00'), p1:'pc', p2:'jg', s1:11, s2:8, elo1:0, elo2:0},
  {id:18, date: Date('February 23, 2024 15:53:00'), p1:'nh', p2:'pc', s1:8, s2:11, elo1:0, elo2:0},
  {id:19, date: Date('February 23, 2024 15:59:00'), p1:'nh', p2:'pc', s1:9, s2:11, elo1:0, elo2:0},
  {id:20, date: Date('February 23, 2024 16:10:00'), p1:'nh', p2:'pc', s1:11, s2:9, elo1:0, elo2:0},
  {id:21, date: Date('February 23, 2024 16:22:00'), p1:'nh', p2:'zz', s1:11, s2:7, elo1:0, elo2:0},
  {id:22, date: Date('February 23, 2024 16:30:00'), p1:'pc', p2:'zz', s1:11, s2:9, elo1:0, elo2:0},
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/matches', (request, response) => {
  response.json(matches)
})

app.get('/api/matches/:id', (request, response) => {
  console.log(request.params.id)
  const id = Number(request.params.id)
  const match = matches.find(match => match.id === id)
  
  if (match) {
    response.json(match)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/matches/:id', (request, response) => {
  const id = Number(request.params.id)
  matches = matches.filter(match => match.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = matches.length > 0
    ? Math.max(...matches.map(n => n.id))
    : 0

  return maxId + 1
}

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0) 
}

const validate = (body) => {
  if(!body.p1 || !body.p2 || !body.s1  || !body.s2 || !isNumber(body.s1) || !isNumber(body.s2)) {
    return false
  }

  return true
}

app.post('/api/matches', (request, response) => {
  const body = request.body

  if(!validate(body)) {
    return response.status(400).json({ 
      error: 'incorrect content' 
    })
  }

  const date = Date()

  let match = body

  match.id = generateId()
  match.date = date

  matches = matches.concat(match)

  response.json(match)
})

app.get('')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)