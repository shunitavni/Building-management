const mongoose = require('mongoose');

const userRecordsSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const UserRecords = mongoose.model('UserRecords', userRecordsSchema);

module.exports = UserRecords;
