const { CREATE_NEW_TASK } = require('../utils/validationSchema.js')
const createHttpError = require('http-errors')

module.exports.validateTaskOnCreate = async (req, res, next) => {
  try {
    const validateNewTask = await CREATE_NEW_TASK.validate(req.body)
    req.body = validateNewTask
    next()
  } catch (error) {
    next(createHttpError(422, error.message))
  }
}