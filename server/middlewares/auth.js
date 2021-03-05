const { User } = require('../models');
const { verifyLogin } = require('../helpers/jwt');

const authenticate = (req, res, next) => {
  try {
    let { id, email } = verifyLogin(req.headers.access_token)
    
    User.findOne({
      where: { id, email }
    })

    .then(user => {
      console.log(user, '>>>>> user');
      req.currentUser = {id: user.id, email: user.email}
      next()
    })
    .catch(err => {
      console.log(err, '>>>> err');
      res.status(404).json({message: "Not Found"})
    })
  } catch (error) {
    res.status(401).json({message: error})
  }
}


module.exports = authenticate