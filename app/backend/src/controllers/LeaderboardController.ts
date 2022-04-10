import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async leaderboard(req: Request, res: Response) {
    const pathHome = req.path.includes('home');
    const pathAway = req.path.includes('away');
    if (pathHome) {
      const result = await LeaderboardService.buildLeaderboard('home');
      return res.status(200).json(result);
    }
    if (pathAway) {
      const result = await LeaderboardService.buildLeaderboard('away');
      return res.status(200).json(result);
    }
    const result = await LeaderboardService.buildLeaderboard('home&away');
    return res.status(200).json(result);
  }
}
