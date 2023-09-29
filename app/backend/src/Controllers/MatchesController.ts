import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const ServiceResponse = await this.matchesService.getAllMatches();
    res.status(200).json(ServiceResponse.data);
  }
}
