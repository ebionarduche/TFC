import { Request, Router, Response } from 'express';
import MatchesController from '../Controllers/MatchesController';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.matchFinish(req, res),
);

export default router;
