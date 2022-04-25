const mongoose = require('mongoose');
const { MongoTopologyCloseError } = require('mongodb');

const { Schema } = mongoose;

const PriseRdvSchema = new Schema({
  nom : {
    type:String, required: true, minlength: 2, maxlength: 30
  },
   prenom: {
    type:String, required: true, minlength: 2, maxlength: 30
  },
  mail: {
    type:String, required:true, minlength: 8, maxlength: 30
  },
  phone: {
     type:String, required:true, length: 10
  },
  motif: {
     type:String, length:50, required:true
  },
  start: {
    type: String, required:true, unique:true
  },
  end: {
    type: String, required:true, unique:true
  }
});

module.exports = mongoose.model("PriseRdv", PriseRdvSchema);

