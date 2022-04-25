const GestionRdv = require('../models/prise-rdv');
const mongoose = require('mongoose');

const gestionrdv = {};

gestionrdv.getGestionRdv = async (req, res) => {
    const rdvs = await GestionRdv.find(req.params).select('-_id').select('-__v');
    res.status(201).json(rdvs);
}

gestionrdv.deleteGestionRdv = async  (req,res) => {
  const unRdv = await GestionRdv.findOne({start: req.params.end});
  console.log(unRdv);
  const rdv = await GestionRdv.findByIdAndRemove(unRdv);
  console.log(rdv);
  res.json({
    status : 'Rendez-vous supprimé'
  });
};



module.exports = gestionrdv;
