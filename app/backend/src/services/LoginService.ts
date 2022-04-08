import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/token';
import { IParamsLogin } from '../interfaces/login';
import UserService from './UserService';

export default class LoginService {
  static async login(loginParams: IParamsLogin) {
    const user = await UserService.findByEmail(loginParams.email);
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const token = jwt.sign({ email: loginParams.email, password: loginParams.password }, secret, {
      algorithm: 'HS256',
      expiresIn: '10d',
    });
    return { user, token };
  }

  static async loginValidate(token: string) {
    const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
    const { email } = jwt.verify(token, secret) as TokenPayload;
    const user = await UserService.findByEmail(email);
    return user?.role;
  }
}
