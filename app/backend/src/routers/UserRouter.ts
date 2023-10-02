import { Request, Router, Response } from 'express';
import UserController from '../Controllers/UserController';
import Validations, { RequestWithRole } from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/login',
  Validations.validateLogin,

  (req: Request, res: Response) => userController.login(req, res),
);
router.get('/login/role', Validations.validateToken, (req: Request, res: Response) => {
  res.status(200).json({ role: (req as RequestWithRole).role });
});
export default router;
