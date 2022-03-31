import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await LoginService.login({ email, password });
    return res.status(200).json(result);
  }

  public static async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const result = await LoginService.loginValidate(authorization);
      res.status(200).send(result);
    }
  }
}
