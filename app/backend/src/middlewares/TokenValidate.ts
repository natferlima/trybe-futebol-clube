import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

export default class TokenValidate {
  static async jwtValidate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    if (authorization) {
      try {
        const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
        jwt.verify(authorization, secret);
      } catch (_e) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    next();
  }
}
