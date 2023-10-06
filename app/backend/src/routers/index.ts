import { Router } from 'express';
import teamsRouter from './teamsRouter';
import userRouter from './UserRouter';
import matchesRouter from './MatchesRouter';
import leaderboardRouter from './LeaderboardsRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
