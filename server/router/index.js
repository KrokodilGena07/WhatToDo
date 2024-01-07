import Router from 'express';
import authRouter from "./authRouter.js";
import clubRouter from "./clubRouter.js";
import infoRouter from "./infoRouter.js";

const router = new Router();

router.use('/auth', authRouter);
router.use('/clubs', clubRouter);
router.use('/info', infoRouter);

export default router;