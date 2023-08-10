const { phones } = require("../db/models");
const _ = require('lodash');

module.exports = {
  getPhones: async (req, res) => {
    try {
      const foundPhones = await phones.findAll({
        raw: true,
        attributes: { exclude: ['createdAt', 'updatedAt']}
      });
      res.status(200).send(foundPhones);
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
  getPhoneById: async (req, res) => {
    try {
      const { phoneId } = req.params;
      const phonesResult = await phones.findByPk(phoneId, {
        raw: true,
        attributes: { exclude: ['createdAt', 'updatedAt']}
      });
      if (!phonesResult) return res.status(404).send(`Phone not found`);

      res.status(200).send(phonesResult);
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
  createPhone: async (req, res) => {
    const { body } = req;
    try {
      const createdPhone = await phones.create(body);
      if(!createdPhone)
        return res.status(500).send('Server error')
      res.status(200).send(createdPhone);
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
  updatePhoneById: async (req, res) => {
    const { body, params: { phoneId } } = req;
    try {
      const updatePhone = await phones.update(body, {
        where: { id: phoneId },
        raw: true,
        returning: true
      });
      console.log(updatePhone[0])

      if (!updatePhone) 
        return res.status(404).send(`Phone not found`);
      
      res.status(200).send(updatePhone)
    } catch (error) {
      res.status(500).send("Server error");
      console.log(error)
    }
  },
  deletePhoneById: async (req, res) => {
    try {
      const { phoneId } = req.params;
      const deletePhone = await phones.destroy({
        where: { id: phoneId },
      })
      if(deletePhone === 0)
        return res.status(404).send('Phone not found')
      res.status(200).send(`Phone deleted successfully ${deletePhone}`);
    } catch (error) {
      res.status(500).send("Server error");
    }
  },
};
