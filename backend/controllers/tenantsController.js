const Tenants = require('./../models/tenantsModel');

exports.getAllTenants = async (req, res) => {
  try{
  const tenants = await Tenants.find()

  res.status(200).json({
    status: 'success',
    results: tenants.length,
    data: {
      tenants
      }
    });
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
};

exports.getTenant = (req, res) => {
  console.log(req.params);
  const Tenants = Tenants.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tenants
    }
  });
};

//create a new tenant
exports.createTenant = async (req, res) => {
  try {
    const newTenant = await Tenants.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tenants: newTenant
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

exports.updateTenant = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTenant = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
