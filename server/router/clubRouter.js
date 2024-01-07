import Router from 'express';
import clubController from "../controllers/clubController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {clubsValidator, clubValidator} from "../validators/clubValidator.js";

const clubRouter = new Router();

clubRouter.post('/', authMiddleware, ...clubValidator, clubController.createClub);
clubRouter.put('/image', authMiddleware, clubController.setClubImage);
clubRouter.get('/', ...clubsValidator, clubController.getClubs);
clubRouter.get('/:id', clubController.getClub);
clubRouter.delete('/:id', authMiddleware, clubController.deleteClub);

export default clubRouter;