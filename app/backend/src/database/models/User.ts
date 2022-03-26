import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;

  username!: string;

  role!: string;

  email!: string;

  password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

}, {

  underscored: true,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export default User;
