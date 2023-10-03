import MatchesModel, { IMatch } from '../models/MatchesModel';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  public async getAllMatches(query: string) {
    const allMatches = await this.matchesModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async matchFinish(id: number) {
    const [affectedRows] = await this.matchesModel.matchFinish(id);
    if (affectedRows === 0) return '';
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatches(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const [affectedRows] = await this.matchesModel.updateMatches(id, homeTeamGoals, awayTeamGoals);
    if (affectedRows === 0) return '';
    return { status: 'SUCCESSFUL', data: { message: 'Updated match' } };
  }

  public async insertMatches(newMatch: IMatch) {
    const ServiceResponse = await this.matchesModel.insertMatches(newMatch);
    return { status: 'SUCCESSFUL', data: ServiceResponse };
  }
}
