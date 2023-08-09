const { Router } = require('express')
const {powersController} = require("../controllers");

const powersRouter = Router()

powersRouter
  .route('/')
  .get(powersController.getPowers)
  .post(powersController.createPower)

module.exports = powersRouter