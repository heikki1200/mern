const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const app = express()
const port = process.env.port || 5000

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB CONFIG
const db = require('./config/keys').mongoURI

// CONNECT TO MONGODB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())

// PASSPORT CONFIG
require('./config/passport')(passport)

// USE ROUTES
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server running on port ${port}`))
