const Message = require(".././models/Messages");

//!create a new Message

const createMessage = async (req, res) => {
  const { message, writingBy, belongTo } = req.body;

  const messages = await Message.create({ message, writingBy, belongTo });
  try {
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//!get all Messages

const getAllMessage = async (req, res) => {
  const messages = await Message.find();
  try {
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//!get all Messages

const getATicketMessages = async (req, res) => {
  const { belongTo } = req.body; //*to find all messages that belong to a specific issue

  const messages = await Message.find({ belongTo });
  try {
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage, getAllMessage, getATicketMessages };
