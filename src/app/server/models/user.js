const mongoose = require('mongoose');
const { MongoTopologyCloseError } = require('mongodb');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    nom : {
        type:String, required: true, minlength: 1, maxlength: 30
    },
    prenom : {
        type:String, required: true, minlength: 1, maxlength: 30
    },
    age : {
        type:String, required: true, length: 2
    },
    genre : {
        type:String, required: true
    },
    mail : {
        type:String, required: true, minlength: 5, maxlength: 30, unique: true
    },
    phone : {
        type:String, required: true, length: 10, unique: true
    },
    mdp : {
    	type:String, required: true, minlength: 8, maxlength: 16
        }

    },

);
//Fonction "appelé" avant de sauvegarder
//"saler" le mot de passe
UserSchema.pre("save", async function(next) {//next => Après avoir fait on passe à la suite
  const salt = await bcrypt.genSalt(); //bcrypt génère des caractères que seul lui connait pour "saler" le mot de passe
  this.mdp = await bcrypt.hash(this.mdp, salt);
  next();
});

//Méthode statique
UserSchema.statics.login = async function(mail, mdp) {
  const user = await this.findOne({mail}); //Cherche un utilisateur possédant le mail mail qui est unique
  console.log(user);
  if(user) {
    //const mdp = bcrypt.hash(this.mdp);
    const auth = await bcrypt.compare(mdp, user.mdp); //Si on trouve l'utilisateur, on compare le mot de passe saisie au mot de passe présent dans la base de donneés
    if(auth) {
      return user; //Si tout correspond, on renvoie l'utilisateur
    }
    throw Error('Mot de passe incorrect');
  }
  throw Error('Mail incorrect');
}

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
