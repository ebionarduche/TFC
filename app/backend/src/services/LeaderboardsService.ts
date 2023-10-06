import { ITeams } from '../Interfaces/ITeamsModel';
import Matcher from '../database/models/MatcherModel';

export default class LeaderboardsService {
  private model = Matcher;

  async getMatches(id: number) {
    const matches = await this.model.findAll({
      where: {
        inProgress: false,
      },
    });

    const homeMatches = matches.filter((match) => match.homeTeamId === id);
    const awayMatches = matches.filter((match) => match.awayTeamId === id);

    return [homeMatches, awayMatches];
  }

  async calculateTotalGoals(id: number) {
    const [homeMatches, awayMatches] = await this.getMatches(id);

    const homeGoalsFavor = homeMatches.map(({ homeTeamGoals }) => homeTeamGoals)
      .reduce((acc, curr) => acc + curr, 0);
    const awayGoalsFavor = awayMatches.map(({ awayTeamGoals }) => awayTeamGoals)
      .reduce((acc, curr) => acc + curr, 0);
    return {
      goalsFavor: homeGoalsFavor + awayGoalsFavor,
      goalsOwn: (awayGoalsFavor * 2),
    };
  }

  async getGames(id: number) {
    const [homeMatches, awayMatches] = await this.getMatches(id);
    const totalGames = homeMatches.length + awayMatches.length;

    const totalVictories = homeMatches.filter((match) =>
      match.homeTeamGoals > match.awayTeamGoals).length + awayMatches
      .filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;

    const totalLosses = homeMatches.filter((match) =>
      match.awayTeamGoals > match.homeTeamGoals).length + awayMatches
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;

    return {
      totalGames, totalVictories, totalLosses };
  }

  async calculatePoints(id: number) {
    const { totalGames, totalVictories, totalLosses } = await this.getGames(id);
    const totalDraws = totalGames - (totalVictories + totalLosses);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return {
      efficiency,
      totalPoints,
    };
  }

  async getLeaderboard(teams: ITeams[]) {
    const leaderBoard = Promise.all(teams.map(async (team) => {
      const { goalsFavor, goalsOwn } = await this.calculateTotalGoals(team.id);
      const { totalGames, totalVictories, totalLosses } = await this.getGames(team.id);
      const { totalPoints, efficiency } = await this.calculatePoints(team.id);
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws: totalGames - (totalVictories + totalLosses),
        totalLosses,
        goalsFavor,
        goalsOwn,
        efficiency,
        goalsBalance: goalsFavor - goalsOwn,
      };
    }));
    return leaderBoard;
  }
}
