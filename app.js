'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app =  express()
const api = require('./routes/index')
const passport = require('passport')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())



app.use('/api', api)



module.exports = app
