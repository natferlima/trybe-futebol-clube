import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';

const INCORRECT = 'Incorrect email or password';

export default class LoginValidate {
  static async fildsValidate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    if (!password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    next();
  }

  static async emailAndPassValidate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    if (!regexEmail.test(email)) {
      return res.status(401).json({
        message: INCORRECT });
    }
    if (password.length <= 6) {
      return res.status(401).json({
        message: INCORRECT });
    }

    next();
  }

  static async userExists(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: INCORRECT });
    }
    const verifyPassword = await bcrypt.compare(password, user?.password);
    if (!verifyPassword) {
      return res.status(401).json({
        message: INCORRECT });
    }

    next();
  }
}
