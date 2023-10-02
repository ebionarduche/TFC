import toBoolean from '../utils/toBoolean';
import Team from '../database/models/TeamModel';
import Matcher from '../database/models/MatcherModel';

export default class MatchesModel {
  private model = Matcher;
  async findAll(query: string) {
    const verify = toBoolean(query);
    if (verify === '') {
      const data = await this.model.findAll({
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return data.map((match) => match);
    }
    const data = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress: verify },
    });
    return data;
  }

  async matchFinish(id: number) {
    const data = await this.model.update({ inProgress: false }, { where: { id } });
    return data;
  }
}
