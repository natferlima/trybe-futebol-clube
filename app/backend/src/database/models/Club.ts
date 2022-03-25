import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  id!: number;
  club_name!: string;
}

Club.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  club_name: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {

  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
  timestamps: false,
});

export default Club;
