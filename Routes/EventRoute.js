const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../Controllers/event.js");

const checkAuth = require("../Middlewares/checkAuth.js");

router.post(
  "/",
  checkAuth,

  createEvent
);

router.get("/", checkAuth, getEvents);

router.put(
  "/:id",
  checkAuth,

  updateEvent
);
router.delete("/:id", checkAuth, deleteEvent);

module.exports = router;
