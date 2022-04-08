import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await LoginService.login({ email, password });
    return res.status(200).json(result);
  }

  public static async loginValidate(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (token) {
      const result = await LoginService.loginValidate(token);
      res.status(200).json(result);
    }
  }
}
