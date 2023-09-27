import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamsModel, { ITeams } from '../Interfaces/ITeamsModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamsModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
