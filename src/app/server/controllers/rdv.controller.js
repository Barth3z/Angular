const Rdv = require('../models/rdv');
const mongoose = require('mongoose');

const rdvCtrl = {};

rdvCtrl.postNewRdv = async(req, res) => {
  const rdv = new Rdv(req.body);
  try {
    await rdv.save();
    res.status(201).json({
      status: 'ok'
    });
  }
  catch(err) {
    res.status(204).json({
      err,
      status: 'déjà pris !'
    })
  }
};

rdvCtrl.getNewRdvs = async(req, res) => {
  try {
    const rdvs = await Rdv.find().select('-_id').select('-__v');
    res.status(201).json({rdvs});
  }
  catch {
    res.status(204).json({err});
  }
};



module.exports = rdvCtrl;

