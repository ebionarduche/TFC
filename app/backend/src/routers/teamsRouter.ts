import { Request, Router, Response } from 'express';
import TeamController from '../Controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

export default router;
