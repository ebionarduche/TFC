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

    return homeMatches;
  } // ok

  async calculateTotalGoals(id: number) {
    const homeMatches = await this.getMatches(id);

    const homeGoalsFavor = homeMatches.map(({ homeTeamGoals }) => homeTeamGoals)
      .reduce((acc, curr) => acc + curr, 0);
    const awayGoalsFavor = homeMatches.map(({ awayTeamGoals }) => awayTeamGoals)
      .reduce((acc, curr) => acc + curr, 0);
    return {
      goalsFavor: homeGoalsFavor,
      goalsOwn: awayGoalsFavor,
    };
  } // ok

  async getGames(id: number) {
    const homeMatches = await this.getMatches(id);
    const totalGames = homeMatches.length;

    const totalVictories = homeMatches
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;

    const totalLosses = homeMatches
      .filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;

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
        goalsBalance: goalsFavor - goalsOwn,
        efficiency,
      };
    }));
    return leaderBoard;
  }
}
