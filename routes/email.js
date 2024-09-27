const router = require("express").Router();
const { scheduleEmail } = require("../controllers/email");

router.post("/schedule", scheduleEmail);

module.exports = router;
