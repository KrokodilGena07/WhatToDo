import Router from 'express';
import {authValidator} from "../validators/authValidator.js";
import authController from "../controllers/authController.js";

const authRouter = new Router();

authRouter.post('/registration', ...authValidator, authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/activate/:link', authController.activate);
authRouter.get('/refresh', authController.refresh);

export default authRouter;