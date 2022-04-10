import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async leaderboard(req: Request, res: Response) {
    const result = await LeaderboardService.buildLeaderboard();
    return res.status(200).json(result);
  }
}
