const mongoose = require('mongoose');

const { Schema } = mongoose;

const RdvSchema = new Schema({
  start: {
    type: Date, unique:true
  },
  end: {
    type: Date, unique:true
  }
});

module.exports = mongoose.model("Rdv", RdvSchema);