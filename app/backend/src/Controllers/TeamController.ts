import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async getAllTeams(_req: Request, res: Response) {
    const ServiceResponse = await this.teamService.getAllTeams();
    res.status(200).json(ServiceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const ServiceResponse = await this.teamService.getTeamById(Number(id));

    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(ServiceResponse.data);
    }
    return res.status(200).json(ServiceResponse.data);
  }
}
