const QueuedEmail = require("../models/email");

exports.scheduleEmail = async (req, res) => {
  const { subject, content, to } = req.body;

  try {
    const newQueuedEmail = new QueuedEmail({
      to,
      subject,
      content: JSON.stringify(content),
    });

    await newQueuedEmail.save();
    return res.status(200).json({ message: "Email queued successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getQueuedEmails = async (category) => {
  try {
    const isNewlyQueuedEmail = category === "new";
    let unsentEmails = [];

    if (isNewlyQueuedEmail) {
      unsentEmails = await QueuedEmail.find({
        status: "pending",
        attempts: 0,
      });
    } else {
      unsentEmails = await QueuedEmail.find({
        status: "failed",
        attempts: { $gt: 1, $lt: 4 },
      });
    }
    return unsentEmails;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.updateDocStatus = async (id, status) => {
  try {
    const queuedEmail = await QueuedEmail.findOne({ id });
    const updatedDoc = await QueuedEmail.updateOne(
      { id },
      { status, attempts: queuedEmail.attempts + 1 }
    );
    return updatedDoc;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
