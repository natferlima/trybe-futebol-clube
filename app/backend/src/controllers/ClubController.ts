import { Request, Response } from 'express';
import ClubService from '../services/ClubService';

export default class ClubController {
  public static async findAll(req: Request, res: Response) {
    const result = await ClubService.findAll();
    return res.status(200).json(result);
  }

  public static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ClubService.findById(id);
    res.status(200).json(result);
  }
}
