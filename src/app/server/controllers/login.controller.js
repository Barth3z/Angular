const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const loginCtrl = {};

loginCtrl.logIn = async (req, res) => {
  const {mail, mdp} = req.body

  try {
    const user = await UserModel.login(mail, mdp); //Voir dans la BD si cet utilisateur existe
    return res.status(201).json(
      {

        //status: 'trouvé'
        user: user._id
      }
    )
  }
  catch(err) {
    return res.status(240).json({
      status: "Mot de passe ou mail incorrect"
    });
  }
};

module.exports = loginCtrl;