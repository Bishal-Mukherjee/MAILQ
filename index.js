const express = require("express");
const server = express();
const cors = require("cors");
const { initializeMongoose } = require("./database/config");
require("dotenv").config();

require("./cron/scheduler");

server.use(cors());
server.use(express.json({ extended: false }));

initializeMongoose();

server.get("/", (req, res) => {
  res.send("🚀 SERVER WORKING");
});

server.use("/api/email", require("./routes/email"));

const PORT = process.env.PORT || 9090;

server.listen(PORT, () => {
  console.log("🚀 SERVER LISTENING ::", PORT);
});
