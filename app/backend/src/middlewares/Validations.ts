import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Token from '../utils/JsonWebToken';

export interface RequestWithRole extends Request {
  role: JwtPayload;
}

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    const role = Token.verify(token);
    if (!role) return res.status(401).json({ message: 'Token must be a valid token' });
    if (typeof role !== 'boolean') (req as RequestWithRole).role = role;

    next();
  }
}
