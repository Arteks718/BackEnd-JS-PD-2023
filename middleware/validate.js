const { USER_VALIDATION_SCHEMA } = require("../utils/validationsSchemas.js");

module.exports.userValidation = async (req, res, next) => {
  try {
    const validateUser = await USER_VALIDATION_SCHEMA.validate(req.body);
    req.body = validateUser
    next()
  } catch (error) {
    res.status(422).send({error: error.errors})
    console.log("error", error);
  }
  next();
};