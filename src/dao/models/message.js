import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: String,
  message: String, // Asegúrate de tener el campo message en el esquema
});

const Message = mongoose.model('Message', messageSchema);

export default Message;