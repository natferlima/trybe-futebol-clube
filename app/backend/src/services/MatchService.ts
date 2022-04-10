import { NewMatch } from '../interfaces/match';
import Match from '../database/models/Match';
import Club from '../database/models/Club';

export default class ClubService {
  static async findAll() {
    const result = await Match.findAll({
      // estava aparecendo home_team e away_team no resultado por isso usei attributes
      attributes: ['id', ['home_team', 'homeTeam'], ['away_team', 'awayTeam'],
        ['home_team_goals', 'homeTeamGoals'], ['away_team_goals', 'awayTeamGoals'],
        ['in_progress', 'inProgress']],
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] }],
    });
    return result;
  }

  static async findAllInProgressOrFinished(inProgress: number) {
    const result = await Match.findAll({
      // estava aparecendo home_team e away_team no resultado por isso usei attributes
      attributes: ['id', ['home_team', 'homeTeam'], ['away_team', 'awayTeam'],
        ['home_team_goals', 'homeTeamGoals'], ['away_team_goals', 'awayTeamGoals'],
        ['in_progress', 'inProgress']],
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] }],
      where: {
        in_progress: inProgress,
      },
    });
    return result;
  }

  static async create(newMatch: NewMatch) {
    const { id } = await Match.create(newMatch);
    if (id) {
      return {
        id,
        homeTeam: newMatch.homeTeam,
        awayTeam: newMatch.awayTeam,
        homeTeamGoals: newMatch.homeTeamGoals,
        awayTeamGoals: newMatch.awayTeamGoals,
        inProgress: newMatch.inProgress,
      };
    }
  }

  static async updateInProgressToFinish(id: string) {
    await Match.update({ inProgress: false }, { where: { id } });
    const result = await Match.findByPk(id);
    return result;
  }

  static async updateMatchInProgress(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    const result = await Match.findByPk(id);
    return result;
  }
}
