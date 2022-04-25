const PriseRdv = require('../models/prise-rdv');
const mongoose = require('mongoose');

const priseRdvCtrl = {};

priseRdvCtrl.createRdv = async (req,res) => {
    const priserdv  = new PriseRdv(req.body);
      await priserdv.save();
      res.status(201).json({
          status: 'Rendez-vous enregistré'
      });
}

priseRdvCtrl.getRdvs = async (req, res) => {
  const priserdv = await PriseRdv.find().select('-_id').select('-__v'); //Quand il trouve un utilisateur et les selectionnent sans le mot de passe => Les envoie
  res.status(201).json(priserdv); //Envoie sur postman les users existants
};

module.exports = priseRdvCtrl;
