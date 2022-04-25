const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String, required:true,
  },
  start: {
    type: Date, unique:true, required:true
  },
  end: {
    type: Date, unique:true, required:true
  }
});

module.exports = mongoose.model("Event", EventSchema);
