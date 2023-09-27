import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamsModel, { ITeams } from '../Interfaces/ITeamsModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamsModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Time não encontrado' } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
