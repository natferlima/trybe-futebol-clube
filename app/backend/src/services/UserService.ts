import User from '../database/models/User';

export default class UserService {
  static async findByEmail(email: string) {
    const result = await User.findOne({ where: { email } });
    return result;
  }
}
