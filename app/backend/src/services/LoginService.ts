import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import { IParamsLogin } from '../interfaces/login';
import UserService from './UserService';

export default class LoginService {
  static async login(loginParams: IParamsLogin) {
    const user = await UserService.findByEmail(loginParams.email);
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const token = jwt.sign({ loginParams }, secret, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    return { user, token };
  }
}