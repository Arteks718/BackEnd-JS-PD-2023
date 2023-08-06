const { Hero } = require("../db/models");

module.exports = {
  createHero: async (req, res, next) => {
    const { body } = req;
    try {
      const newHero = await Hero.create(body)
      if(!newHero) {
        return res.status(400).send(`Hero creation failed`)
      }
      res.status(201).send(newHero)
    } catch (error) {
      next(error)
    }
  },
  getHeroes: async (req, res, next) => {
    try {
      const heroes = await Hero.findAll({ order: ['id'],
        raw: true,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).send({ data: heroes });
    } catch (error) {
      // console.log(error);
      next(error)
    }
  },
  getHeroById: async (req, res, next) => {},
  updateHeroById: async (req, res, next) => {
    const { body, params: { heroId } } = req;

    try {
      const [updatedHeroCount, [updatedHero]] = await Hero.update(body, {
        where: {
          id: heroId,
        },
        raw: true,
        returning: true,
      });

      if (!updatedHeroCount) {
        return next(createError(404, "Hero Not Found"));
      }
      res.status(200).send({ data: updatedHero });
    } catch (err) {
      next(err);
    }
  },
  deleteHeroById: async (req, res, next) => {
    const { params: { heroId } } = req;
  
    try {
      const deletedHeroCount = await Hero.destroy({
        where: {
          id: heroId,
        },
      });
  
      if (!deletedHeroCount) {
        return next(createError(404, 'Hero Not Found'));
      }
      res.status(204).send('Hero deleted successfully');
    } catch (err) {
      next(err);
    }
  },
};
