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
router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatches(req, res),
);
router.post(
  '/',
  Validations.validateToken,
  Validations.validateMatches,
  (req: Request, res: Response) => matchesController.insertMatches(req, res),
);

export default router;
