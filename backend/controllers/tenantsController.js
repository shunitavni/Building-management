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
    });
  }
};

// get only one tenant by name
exports.getTenant = async (req, res) => {
 try{
    const tenant = await Tenants.findOne({"name": req.params.name});
    res.status(200).json({
      status: 'success',
      results: tenant.length,
      data: {
        tenants : tenant
        }
      });
   }catch(err){
    res.status(404).json({
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

//find by name and update
exports.updateTenant = async (req, res) => {
  try{
    const tenantUpdated = await Tenants.findOneAndUpdate({"name":req.params.name},req.body, {
      new: true,
      runValidators:true,
    });
    res.status(200).json({
      status: 'success',
      results: tenantUpdated.length,
      data: {
        tenants:tenantUpdated
        }
      });
   }catch(err){
    res.status(404).json({
      status: 'failed to get one tenant',
      message: err
    });
  };
}


exports.deleteTenant = async (req, res) => {
  try{
    const tenantDeleted = await Tenants.findOneAndDelete({"name":req.params.name});
    res.status(200).json({
      status: 'success',
      results: tenantDeleted.length,
      data: {
        tenants:tenantDeleted
        }
      });
   }catch(err){
    res.status(404).json({
      status: 'failed to get one tenant',
      message: err
    });
  };
};
