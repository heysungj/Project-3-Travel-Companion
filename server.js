const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
require('dotenv').config()
require('./config/database')

const app = express()

app.use(logger('dev'))
app.use(express.json())

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))
// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'))

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
// app.use('/api/hotels', require('./routes/api/hotels'));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/tripOrders', ensureLoggedIn, require('./routes/api/tripOrders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });


// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
})