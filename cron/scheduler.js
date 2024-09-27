const cron = require("node-cron");
const { dispatchQueuedEmails } = require("./tasks");

// Run every minute
cron.schedule("* * * * *", async () => {
  await dispatchQueuedEmails("new");
});

// Run every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  await dispatchQueuedEmails("existing");
});
