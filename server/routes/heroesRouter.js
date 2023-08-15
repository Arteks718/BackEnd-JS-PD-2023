const { Router } = require("express");
const {heroesController} = require("../controllers");
const { upload } = require("../middleware");

const heroesRouter = Router();

heroesRouter
  .route("/")
  // .post(upload.uploadHeroFile,heroesController.createHero)
  .post(heroesController.createHero)
  .get(heroesController.getHeroes);

heroesRouter
  .route('/:heroId')
  .get(heroesController.getHeroById)
  .patch(heroesController.updateHeroById)
  .delete(heroesController.deleteHeroById);

module.exports = heroesRouter;
