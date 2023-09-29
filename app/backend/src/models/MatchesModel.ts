import Team from '../database/models/TeamModel';
import Matcher from '../database/models/MatcherModel';

export default class MatchesModel {
  private model = Matcher;

  async findAll() {
    const data = await this.model.findAll({
      include: [{
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return data.map((match) => match);
  }
}
