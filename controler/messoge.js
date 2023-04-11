const Message = require(".././models/Messages");
const Issue = require(".././models/Issue");
//!create a new Message

const createMessage = async (req, res) => {
  const { message, writingBy, belongTo } = req.body;
  const issue = await Issue.findOne({ _id: belongTo });
  const messages = await Message.create({ message, writingBy, belongTo });
  /*  */
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

//!delete a message
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const message = await Message.findByIdAndDelete({ _id: id });

  if (!message) {
    return res.status(401).json({ message: "there is no message by that id" });
  }
  try {
    return res
      .status(201)
      .json({ message: "you have successfully deleted the message" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getAllMessage,
  getATicketMessages,
  deleteMessage,
};
