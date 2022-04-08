import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  id: number;

  homeTeam: number;

  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    field: 'home_team',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    field: 'away_team',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  inProgress: {
    field: 'in_progress',
    allowNull: false,
    type: DataTypes.INTEGER,
  },

}, {

  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'matchHome' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'matchAway' });

export default Match;
