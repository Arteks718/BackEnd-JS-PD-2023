module.exports = (err, req, res, next) => {
  // if(res.headerSet){
  //   return
  // }
  const status = err.status?? 500
  const title = err.message?? 'Server error'
  res.send(status).send({errors: [{status, title}] })
}