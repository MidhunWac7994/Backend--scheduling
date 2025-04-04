const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: String, required: true },  
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
