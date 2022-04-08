import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  public static async findAll(req: Request, res: Response) {
    const result = await MatchService.findAll();
    return res.status(200).json(result);
  }
}
