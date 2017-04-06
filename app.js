'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app =  express()

const passport = require('passport')

require('./passporting')(passport)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

const api = require('./routes/index')(app,passport)
app.use('/api', api)




module.exports = app
