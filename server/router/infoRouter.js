import Router from 'express';
import infoController from "../controllers/infoController.js";

const infoRouter = new Router();

infoRouter.get('/cities', infoController.getCities);
infoRouter.get('/categories', infoController.getCategories);
infoRouter.get('/connect/types', infoController.getConnectTypes);

export default infoRouter;