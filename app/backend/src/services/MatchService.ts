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
}
