const jwt = require('jsonwebtoken');
let SECRETKEY = 'sportstify mantapnian'

function generateToken(payload) {
  return jwt.sign(payload, SECRETKEY)
}

function verifyLogin(token) {
  return jwt.verify(token, SECRETKEY)
}

module.exports = {
  generateToken,
  verifyLogin
}

