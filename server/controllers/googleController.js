const {OAuth2Client} = require('google-auth-library');
const{User} = require('../models')
const {generateToken} = require('../helpers/jwt')

class googleSignInController {

  static handleGoogleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email;
    let name;

    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
        const payload = ticket.getPayload()
        console.log(payload);
        email = payload.email
        name = payload.name
        // const [user, created] = await User.findOrCreate({
        //     where: {email},
        //     defaults: {
        //       name,
        //       password: `${email}${String(new Date())}`
        //     }
        //   });
        // if()
        
        return User.findOne({
            where: {
                email
            }
        })
    })
    .then(data => {
        console.log(data);
        if(!data){
            return User.create({
                email,
                name,
                password: `${email}${String(new Date())}`
            })
        } else {
            return data
        }
        
    })
    .then(data => {
        let access_token = generateToken({
            id: data.id,
            name: data.name,
            email: data.email
        })
        res.status(200).json({
            access_token,
            name: data.name
        })
        console.log(data);
    })
    .catch(err => {
        next(err)
        console.log(err);
    })
  }
}

module.exports = googleSignInController