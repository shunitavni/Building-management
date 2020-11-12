const express = require('express');
const tenantsController = require('../controllers/tenantsController');

const router = express.Router();

//router.param('id', tourController.checkID);

router
  .route('/')
  .get(tenantsController.getAllTours)
  .post(tenantsController.createTour);

router
  .route('/:id')
  .get(tenantsController.getTour)
  .patch(tenantsController.updateTour)
  .delete(tenantsController.deleteTour);

module.exports = router;
