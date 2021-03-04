const { User } = require('../models');
const { comparePassword } = require('../helpers/password-helper');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register(req, res) {
    // res.status(201).json({message: '<<<< SUCCESS'})
    let newData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(newData)
    .then(data => {
      res.status(201).json({
        success: "Haloo, new user has ben successfully to create!",
        data
      })
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
  }

  static login(req, res) {
    // res.status(201).json({message: '<<<< SUCCESS'})
    let data = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {email: data.email}
    })
    .then(user => {
      if (user) {
        const comparedPassword = comparePassword(data.password, user.password)

        if (comparedPassword) {
          const access_token = generateToken({id: user.id, email: user.email})
          res.status(200).json({id: user.id, name: user.name, email: user.email, access_token })
        } else {
          throw res.status(400).json({message: 'Invalid email or password'})
        }
      } else {
        throw res.status(400).json({message: 'Invalid email or password'})
      }
    })
    .catch(err => {
      if (err.message === 'Invalid email or password') {
        res.status(400).json({message: 'Invalid email or password'})
      } else {
        res.status(500).json({message: 'Invalid server error'})
      }
    })
  }
}

module.exports = UserController