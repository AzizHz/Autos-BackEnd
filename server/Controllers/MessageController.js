
var Message = require("../Models/Message");


exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new Message({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

let timeouts = {};

async function getMessage(req, res) {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId });
    const test = 'test'

    res.write("data: " + ` ${JSON.stringify(result)}\n\n`);
    timeouts[chatId] = setTimeout(() => getMessage(req, res), 1000);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  getMessage(req, res);
}

exports.closeConnection = (req, res) => {
  const { chatId } = req.params;
  clearTimeout(timeouts[chatId]);
  res.sendStatus(200);
}
