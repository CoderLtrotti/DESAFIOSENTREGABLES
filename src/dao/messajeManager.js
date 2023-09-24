import Message from './models/message.js';
import mongoose from 'mongoose';

class MessageManager {
  async getAllMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      throw new Error(`Could not get messages: ${error.message}`);
    }
  }

  async createMessage(user, message) {
    const newMessage = new Message({
      user: user,
      message: message,
    });
  
    try {
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      throw new Error(`Could not create message: ${error.message}`);
    }
  }

  async updateMessage(id, content) {
    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        id,
        { message: content },
        { new: true }
      );
      return updatedMessage;
    } catch (error) {
      throw new Error(`Could not update message: ${error.message}`);
    }
  }

  async deleteMessage(id) {
    try {
      const deletedMessage = await Message.findByIdAndDelete(id);
      return deletedMessage !== null; // Devuelve true si se eliminó el mensaje
    } catch (error) {
      throw new Error(`Could not delete message: ${error.message}`);
    }
  }
}

export default MessageManager;
