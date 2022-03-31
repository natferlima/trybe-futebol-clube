import Club from '../database/models/Club';

export default class ClubService {
  static async findAll() {
    const result = await Club.findAll();
    return result;
  }

  static async findById(id: string) {
    const result = await Club.findByPk(id);
    return result;
  }
}
