import { Router } from 'express';
import teamsRouter from './teamsRouter';
import userRouter from './UserRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/', userRouter);

export default router;
