const Tenants = require('../models/tenantsModel')



exports.createTenants = async (req, res)=> {
  try{
    const newTenant = await Tenants.create(req.data);

    res.status(201).json({
      status: 'success',
      dats: {
        tenant: newTenant
      }
    });

  } catch (err){
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

//this sould be get alll tenants
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

//this sould be get specific tenants
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

exports.createTour = (req, res) => {
  
};

//this sould be update a tenant
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

//deleting a tenent
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
