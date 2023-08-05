const {Hero} = require('../db/models')

module.exports = {
  createHero: async (req, res, next) => {},
  getHeroes: async (req, res, next) => {
    try {
      const heroes = await Hero.findAll({
        raw: true,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).send({data: heroes})
    } catch (error) {
      console.log(error)
      // next(error)
    }
  },
  getHeroById: async (req, res, next) => {},
  updateHeroById: async (req, res, next) => {},
  deleteHeroById: async (req, res, next) => {},
}