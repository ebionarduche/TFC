import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Token from '../utils/JsonWebToken';
import TeamModel from '../models/TeamModel';

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

  private static async validateTeams(homeTeamId: number, awayTeamId: number) {
    const model = new TeamModel();
    const homeTeam = await model.findById(Number(homeTeamId));
    const awayTeam = await model.findById(Number(awayTeamId));

    if (!homeTeam || !awayTeam) {
      return false;
    }
    return true;
  }

  static async validateMatches(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const validateTeams = await Validations.validateTeams(Number(homeTeamId), Number(awayTeamId));
    if (!validateTeams) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}
