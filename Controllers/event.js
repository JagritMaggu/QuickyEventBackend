const {Event} = require("../Models/Event.js")


const createEvent = async (req, res) => {
  try {
    const { Title, DateAndTime, Location, Description } = req.body;

    const newEvent = await Event.create({
     Title,
     DateAndTime,
     Location, 
     Description,
      userId: req.user.id,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id }).populate("userId", "_id name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
   const updateData = {
      Title: req.body.Title,
      Description: req.body.Description,
    Location:req.body.Location,
    DateAndTime:req.body.DateAndTime
    };
   
    const updated = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Event not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findOneAndDelete({
      _id: req.params.id, 
      // the event to be deleted
      userId: req.user.id,
      // the user who's Event is to be deleted
    });

    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent, 
};