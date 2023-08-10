const createHttpError = require('http-errors')

module.exports.errorHandler = async (err, req, res, next) => {
  if(res.headerSet) {
    return
  }
  const status = err.status?? 500
  const message = err.message?? 'Server error'
  res.status(status).send(message)
}