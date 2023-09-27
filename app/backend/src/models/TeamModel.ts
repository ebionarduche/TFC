import Team from '../database/models/TeamModel';
import ITeamsModel, { ITeams } from '../Interfaces/ITeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = Team;

  async findAll(): Promise<ITeams[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const data = await this.model.findByPk(id);
    if (data == null) return null;
    const { teamName }: ITeams = data;
    return { id, teamName };
  }
}
