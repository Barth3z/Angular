const express = require('express');
const router = express.Router();
const User = require('../models/user');
const PriseRdv = require('../models/prise-rdv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Rdv = require("../models/rdv");
const moment = require('moment');

const user = require('../controllers/user.controller');
const login = require('../controllers/login.controller');
const priserdv = require('../controllers/prise-rdv.controller');
const rdv = require('../controllers/rdv.controller');
const evenement = require('../controllers/events.controller');
const gestionrdv = require('../controllers/gestionrdv.controller');

//Renvoie une réponse selon la route
router.get('/', user.getUsers); //Ici, renvoie tous les utilisateurs au roote '/' grâce à la fonction get
router.post('/', user.createUser); //Ici, création d'un utilisateur au route '/' grâce à la fonction post
router.get('/:id', user.getUser); //Ici, renvoie un utilisateur id au route '/:id'
router.put('/:id', user.editUser); //Ici, modification d'un utilisateur au route '/:id' grâce à la fonction put
router.delete('/:id', user.deleteUser); //Ici, suppression d'un utilisateur au route '/:id' grâce à la fonction delete

router.post('/login', login.logIn);

router.get('/prise-rdv/borna', priserdv.getRdvs); //Ici, on renvoie tous les rendez-vous pris
router.post('/prise-rdv', priserdv.createRdv); //Ici, on enregistre les données pour le rendez-vous

router.get('/rdv/borna', rdv.getNewRdvs);
router.post('/rdv', rdv.postNewRdv);

router.post('/events', evenement.createEvent);
router.get('/events/borna', evenement.getEvents);
router.delete('/events/:title', evenement.deleteEvent);

router.get('/gestionrdv/:mail', gestionrdv.getGestionRdv);
router.delete('/gestionrdv/:end', gestionrdv.deleteGestionRdv);


module.exports = router;
