const Tenants = require('./../models/tenantsModel');

exports.getAllTenants = async (req, res) => {
  try {
    console.log(req.query);
    const tenants = await Tenants.find();

    res.status(200).json({
      status: 'success',
      results: tenants.length,
      data: {
        tenants
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

// get only one tenant by name 
exports.getTenant = async (req, res) => {
  try {
    const tenants = await Tenants.find({ name: { $regex: '^' + req.params.name } });
    res.status(200).json({
      status: 'success',
      results: tenants.length,
      data: {
        tenants
      }
    });
  } catch (err) {
    res.status(204).json({
      status: 'failed to get one tenant',
      message: err
    });
  }
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

//find by id and update
exports.updateTenant = async (req, res) => {
  console.log('body', req.body);
  try {
    const tenant = await Tenants.findById(req.params.id, req.body);
    // const tenantUpdated = await Tenants.findOneAndUpdate(
    //   { name: req.params.name },
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true
    //   }
    // );

    tenant.name = req.body.name;
    tenant.address = req.body.address;
    tenant.debt = req.body.debt;
    tenant.phoneNumber = req.body.phoneNumber;

    await tenant.save();

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed to get one tenant',
      message: err
    });
  }
};

exports.deleteTenant = async (req, res) => {
  try {
    // const tenantDeleted = await Tenants.findOneAndDelete({
    //   name: req.params.name
    // });
    const tenant = await Tenants.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tenant
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed to get one tenant',
      message: err
    });
  }
};

exports.getTenantById = async (req, res) => {
  try {
    const tenant = await Tenants.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: tenant.length,
      data: {
        tenant: tenant
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed to get one tenant',
      message: err
    });
  }
};
