const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  // Agrega más campos según sea necesario
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
