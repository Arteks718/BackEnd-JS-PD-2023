const { Users } = require("../models");
const createHttpError = require("http-errors");

module.exports = {
  createUser: async (req, res, next) => {
    const { body } = req;
    try {
      const createdUser = await Users.create(body);
      if (!createdUser) {
        return next(createHttpError(500, "User not created"));
      }
      res.status(201).send({ data: { createdUser } });
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req, res, next) => {
    const { limit, offset } = req.query;
    try {
      const foundUsers = await Users.find({}, null, {
        limit: limit,
        skip: offset
      })
      if(!foundUsers) {
        return next(createHttpError(500, "Users not found"));
      }
      res.status(200).send({ data: { foundUsers } });
    } catch (error) {
      next(error)
    }
  },
  getUserById: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const foundUser = await Users.findById(userId)
      if(!foundUser) {
        return next(createHttpError(404, "User not found"));
      }
      res.status(200).send({ data: { foundUser } });
    } catch (error) {
      next(error)
    }
  },
  updateUserById: async (req, res, next) => {
    const { body, params: {userId}} = req;
    console.log(userId)
    try {
      const updatedUser = await Users.findByIdAndUpdate(userId, body, {
        new: true,
        runValidators: true
      })
      console.log(updatedUser)
      if(!updatedUser) {
        return next(createHttpError(404, "User not found"));
      }
      res.status(200).send({data: { updatedUser } });
    } catch (error) {
      next(error)
    }
  },
  deleteUserById: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const deletedUser = await Users.findByIdAndDelete(userId)
      if(!deletedUser) {
        return next(createHttpError(404, "User not found"));
      }
      res.status(200).send({data: { deletedUser}});
    } catch (error) {
      next(error)
    } 
  },
};
