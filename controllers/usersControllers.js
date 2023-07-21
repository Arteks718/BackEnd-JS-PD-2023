const _ = require('lodash');
const { user } = require('./../db/models');

module.exports = {
  createUser:async (req, res) => {
    const {body} = req;
    try {
      const createdUser = await user.create(body);
      if(!createdUser)
        return res.status(500).send('Server error')
      const preparedUser = _.omit(createdUser.get(), ['passwordHash', 'createdAt', 'updatedAt']);
      res.status(201).send(preparedUser)
    } catch (error) {
      res.status(500).send('Server error')
    }
  },
  getUsers:async (req, res) => {
    try {
      const foundUsers = await user.findAll({
        raw: true,
        attributes: {exclude: ['passwordHash', 'createdAt', 'updatedAt']}
      })
      res.status(200).send(foundUsers)
    } catch (error) {
      res.status(500).send('Server error')
    }
  },
  getUserById:async (req, res) => {
    try {
      const { userId } = req.params
      const foundUser = await user.findByPk(userId, { 
        raw: true
      })
      if(!foundUser){
        return res.status(404).send(`User id#${userId} not found`)
      }
      res.status(200).send(foundUser)
    } catch (error) {
      res.status(500).send('Server error')
    }
  },
  updateUserById:async (req, res) => {
    const {body, params: {userId}} = req
    try {
      const [, [updatedUser]] = await user.update(body, {
        raw: true,
        where: { id: userId },
        returning: true
      });
      console.log(updatedUser)

      if(!updatedUser)
        return res.status(404).send(`User id#${userId} not found`)

      const preparedUser = _.omit(updatedUser, ['passwordHash', 'createdAt', 'updatedAt']);
      
      res.status(200).send(preparedUser)
    } catch (error) {
      console.log('error', error)
      res.status(500).send('Server error')
    }
  },
  deleteUserById:async (req, res) => {
    const { userId } = req.params;
    try {
      const deleteResult = await user.destroy({where: {id: userId}})
      if(!deleteResult)
        return res.status(404).send(`User not found`);
      
      res.status(204).end()
    } catch (error) {
      res.status(500).send('Server error')
    }
  },
}