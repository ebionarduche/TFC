import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const ServiceResponse = await this.matchesService.getAllMatches(inProgress as string);
    res.status(200).json(ServiceResponse.data);
  }

  public async matchFinish(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.matchesService.matchFinish(Number(id));
    return res.status(200).json(ServiceResponse);
  }

  public async updateMatches(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const ServiceResponse = await this.matchesService
      .updateMatches(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json(ServiceResponse);
  }

  public async insertMatches(req: Request, res: Response) {
    const { body } = req;
    const ServiceResponse = await this.matchesService.insertMatches({ ...body, inProgress: true });
    res.status(201).json(ServiceResponse.data);
  }
}
