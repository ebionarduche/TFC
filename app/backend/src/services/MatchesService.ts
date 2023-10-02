import MatchesModel from '../models/MatchesModel';

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
}
