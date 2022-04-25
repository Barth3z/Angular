const User = require('../models/user');

const userCtrl = {};

userCtrl.getUsers = async (req,res) => {
    const users = await User.find().select('-mdp'); //Quand il trouve un utilisateur et les selectionnent sans le mot de passe => Les envoie
    res.json(users); //Envoie sur postman les users existants
};

userCtrl.createUser = async (req,res) => {
    const user = new User(req.body);
    try {
      await user.save(); //Sauvegarde dans la base de donnée
      res.status(201).json({
        'status': 'User Saved'
      });
    }
    catch(err) {
      res.status(240).json({
        err,
        status: 'Mail ou téléphone déjà utilisé'
      })
    }
}

userCtrl.getUser = async (req, res) => {

    const user = await User.findById(req.params.id).select('-mdp'); //On va chercher l'utilisateur à l'id spécifique
    res.json(user);
}

userCtrl.editUser = async (req,res) => {
    const { id } = req.params;
    const user = {
        nom : req.body.nom,
        prenom : req.body.prenom,
        age : req.body.age,
        mail : req.body.mail,
        genre : req.body.genre,
        phone : req.body.phone,
        mdp : req.body.mdp
    };
    await User.findByIdAndUpdate(id, {$set: user}, {new : true});
    res.json({status : 'User updated'});
};

userCtrl.deleteUser = async  (req,res) =>{
    await User.findByIdAndRemove(req.params.id);
    res.json({status : 'User Deleted'});
};

module.exports = userCtrl;
