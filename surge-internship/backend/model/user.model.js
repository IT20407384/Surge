const mongoose = require("mongoose");
const cors = require("cors");

//now create the schema
const { Schema } = mongoose;

const newUserSchema = new Schema({
  fName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
});

//convert schema into a model
//1st para = collection name, 2nd = schema
const User = mongoose.model("User", newUserSchema);

//export our module to controller
module.exports = User;
