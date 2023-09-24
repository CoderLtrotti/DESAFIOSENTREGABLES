import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type:String,
        unique: true,
        required: true,
        index: true,
    },
    age: Number,
    password: String,
    img: String,
  });

  const userModel = mongoose.model('users', userSchema);

  export default userModel;
