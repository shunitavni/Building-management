const mongoose = require('mongoose');

const tenantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tenant must have a name'],
    maxlength: [20, 'A name must have less or equal then 20 charecters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'A tenant must have a phone number'],

  },
  address: {
    type: String,
    required: [true, 'A tenant must have an address'],
  },
  debt: {
    type: Number,
    min: [0, 'debt is equal or greater than zero']

  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Tenants = mongoose.model('Tenants', tenantsSchema);

module.exports = Tenants;
