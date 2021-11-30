const mongoose = require('mongoose');

module.exports =  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'User name should be provided']
    },
    email: {
      type: String,
      required: [true, 'User email should be provided']
    },
    password: {
        type: String,
        required: [true, 'User password should be provided']
      }
  });