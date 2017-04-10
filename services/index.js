'use strict'

const jwt =  require('jwt-simple')
const moment = require('moment')
const config = require('../config/config-file')  
function createToken(user){
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}
