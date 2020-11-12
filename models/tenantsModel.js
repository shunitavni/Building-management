const mongoose = require('mongoose');


const tenantsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tenant must have a name'],
      unique: true
    },
  
    phoneNumber : {
      type: String,
      required: [true, 'A tenant must have a phone number']
    },
  
    address: String,
    debt: Number
  });

  
const Tenants = mongoose.model('Tenants', tenantsSchema);

module.exports = Tenants;