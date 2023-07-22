const { Router } = require('express');
const { phoneController } = require('../controllers')

const phoneRouter = Router()

phoneRouter
  .route('/')
  // get info about all phones
  .get(phoneController.getPhones)
  // add new phone
  .post(phoneController.createPhone)

phoneRouter
  .route('/:phoneId')
  // get phone by id
  .get(phoneController.getPhoneById)
  // update info phone
  .patch(phoneController.updatePhoneById)
  // delete phone
  .delete(phoneController.deletePhoneById)

module.exports = phoneRouter