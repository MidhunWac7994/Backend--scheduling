const Event = require("../models/Event");


exports.createEvent = async (req, res) => {
    try {
      const { title, start, end, userId } = req.body;
      console.log("Received event data:", req.body);
      console.log("roomId:",req.params);
      const roomId = req.params.id;
      
      
  
      if (!title || !start || !end || !userId || !roomId) {
        return res.status(400).json({ message: "All fields are required, including userId and roomId" });
      }
  
      const newEvent = await Event.create({ title, start, end, userId, roomId });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: "Error creating event", error: error.message });
    }
  };
  

  exports.getEvents = async (req, res) => {
    console.log("getEvents called");
    
    const { roomId } = req.query; // Get roomId from query parameters
  
    try {
      const events = roomId
        ? await Event.find({ roomId })  // Filter events by roomId if provided
        : await Event.find();  // Otherwise, fetch all events
  
      res.status(200).json(events);
      console.log("Events fetched:", events);
      
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error: error.message });
    }
  };
  


// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const { title, start, end } = req.body;
        const eventId = req.params.id;

        if (!title || !start || !end) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const event = await Event.findByIdAndUpdate(eventId, { title, start, end }, { new: true });

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error: error.message });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findByIdAndDelete(eventId);

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
};
