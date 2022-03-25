import { DataTypes, Model } from 'sequelize';
import db from '.';
import Club from './Club';

class Match extends Model {
  id!: number;
  home_team!: number;
  home_team_goals!: number;
  away_team!: number;
  away_team_goals!: number;
  in_progress!: number;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  home_team: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  home_team_goals: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  away_team: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  away_team_goals: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  in_progress: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  
}, {

  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

Match.hasMany(Club, { foreignKey: 'home_team', as: 'home_teamForeignKey' });
Match.hasMany(Club, { foreignKey: 'away_team', as: 'away_teamForeignKey' });

export default Match;
