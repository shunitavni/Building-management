const express = require('express');
const tenantController = require('../controllers/tenantsController');

const router = express.Router();

router
  .route('/')
  .get(tenantController.getTenants)
  .post(tenantController.createTenant);

// router
//   .route('/:name')
//   .get(tenantController.getTenant)

router
  .route('/id/:id')
  .get(tenantController.getTenantById)
  .patch(tenantController.updateTenant)
  .delete(tenantController.deleteTenant);

module.exports = router;
