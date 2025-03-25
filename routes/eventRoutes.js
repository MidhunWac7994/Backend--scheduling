const express = require("express");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../Controllers/eventController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/events/:id", createEvent);
router.get("/events/:id", getEvents);
router.put("/events/:id", updateEvent);
router.delete("/:id", deleteEvent);


module.exports = router;
