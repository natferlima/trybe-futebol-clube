import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  public static async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const result1 = await MatchService.findAllInProgressOrFinished(1);
      return res.status(200).json(result1);
    }
    if (inProgress === 'false') {
      const result2 = await MatchService.findAllInProgressOrFinished(0);
      return res.status(200).json(result2);
    }
    const result3 = await MatchService.findAll();
    return res.status(200).json(result3);
  }

  public static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const result = await MatchService.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress });
    return res.status(200).json(result);
  }
}
