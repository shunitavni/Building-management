const express = require('express'); 
const tenantController = require('./../controllers/tenantsController');

const router = express.Router();

router
  .route('/')
  .get(tenantController.getAllTenants)
  .post(tenantController.createTenant);

router
  .route('/:name')
  .get(tenantController.getTenant)
  .patch(tenantController.updateTenant)
  .delete(tenantController.deleteTenant);

module.exports = router;