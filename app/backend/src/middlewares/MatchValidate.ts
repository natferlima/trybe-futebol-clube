import { Request, Response, NextFunction } from 'express';
import ClubService from '../services/ClubService';

export default class MatchValidate {
  static async verifyClubExists(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const homeTeamExists = await ClubService.findById(homeTeam);
    const awayTeamExists = await ClubService.findById(awayTeam);
    if (!homeTeamExists || !awayTeamExists) {
      return res.status(401).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  }

  static async verifyEqualClubs(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    next();
  }
}
