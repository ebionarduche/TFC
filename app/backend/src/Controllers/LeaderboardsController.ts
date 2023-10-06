import { Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';
import TeamModel from '../models/TeamModel';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardsService()) {}

  public async getLeaderboard(_req: Request, res: Response) {
    const teamModel = new TeamModel();
    const teams = await teamModel.findAll();
    const serviceResponse = await this.leaderboardService.getLeaderboard(teams);
    return res.status(200).json(serviceResponse);
  }
}
