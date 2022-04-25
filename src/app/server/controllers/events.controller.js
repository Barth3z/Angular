const EventsModel = require('../models/events');
const mongoose = require('mongoose');

const eventsCtrl = {};

eventsCtrl.createEvent = async (req, res) => {
  const unEvent = new EventsModel(req.body);
    try {
      await unEvent.save();
      res.status(201).json({
        status: 'Rendez-vous enregistré'
      });
    }
    catch(err) {
      res.status(204).json({
        status: 'Evènement existant'
      });
    }
}

eventsCtrl.getEvents = async(req, res) => {
  const events = await EventsModel.find().select('-__v').select('-_id');
  res.status(201).json(events);
}

eventsCtrl.deleteEvent = async(req, res) => {
  const evenement = await EventsModel.findOne({start: req.params.title});
  console.log(evenement);
  const unEvent = await EventsModel.findByIdAndRemove(evenement);
  console.log(unEvent);
  res.json({
    status: 'Supprimé'
  });
}

module.exports = eventsCtrl;
