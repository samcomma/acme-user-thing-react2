const express = require('express')
const app = express()
const db = require('./db')
const path = require('path')
const { User, Thing, UserThing } = db.models
const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`Now listening to port: ${port}`))

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/users', (req, res, next)=> {
  User.findAll({
    include: [
      {
        model: UserThing,
        include: [ Thing ]
      }
    ]
  })
    .then(users => res.send(users))
    .catch(next)
})

db.syncAndSeed()