import { Request, Response, NextFunction } from 'express';

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
        message: 'Incorrect email or password' });
    }
    if (password.length <= 6) {
      return res.status(401).json({
        message: 'Incorrect email or password' });
    }

    next();
  }
}
