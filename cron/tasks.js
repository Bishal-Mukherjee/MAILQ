const { dispatchEmail } = require("../nodemailer");
const { getQueuedEmails, updateDocStatus } = require("../controllers/email");

// category: "new" / "existing"
const dispatchQueuedEmails = async (category) => {
  try {
    let queuedEmails = [];

    queuedEmails = await getQueuedEmails(category);

    if (queuedEmails.length > 0) {
      await Promise.all(
        queuedEmails.map(async (queuedEmail) => {
          try {
            await dispatchEmail({
              to: queuedEmail.to,
              subject: queuedEmail.subject,
              html: JSON.parse(queuedEmail.content),
            });

            await updateDocStatus(queuedEmail.id, "sent");
          } catch (err) {
            console.log(err);

            await updateDocStatus(queuedEmail.id, "failed");
          }
        })
      );
    } else {
      console.log("No queued emails");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { dispatchQueuedEmails };
