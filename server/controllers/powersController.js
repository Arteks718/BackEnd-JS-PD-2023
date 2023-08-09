const createHttpError = require("http-errors");
const { Power } = require("../db/models");

module.exports = {
  getPowers: async (req, res, next) => {
    try {
      const foundPowers = await Power.findAll();
      res.status(200).send(foundPowers);
    } catch (error) {
      next(error);
    }
    // next(createHttpError(501, 'Not Implemented'))
  },
  createPower: async (req, res, next) => {
    const { body } = req;
    try {
      const newPower = await Power.create(body)
      if(!newPower) {
        return res.status(400).send("Not Implemented");
      }
      res.status(200).send(newPower);
    } catch (error) {
      next(error)
    }
  }
};
