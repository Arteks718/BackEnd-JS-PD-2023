const createHttpError = require('http-errors');
const { Classes } = require('../db/models')

module.exports = {
  getClassesTopics: async (req, res, next) => {
    const { params: { classId } } = req;
    try {
      const classRoom = await Classes.findByPk(classId);
      if(!classRoom) {
        return next(createHttpError(404, 'Classroom not found'))
      }
      const foundTopics = await classRoom.getTopics({
        raw: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).send(foundTopics)
    } catch (error) {
      next(error);
    }
  }
}