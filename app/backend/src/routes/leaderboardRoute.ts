import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get(
  '/leaderboard/home',
  LeaderboardController.leaderboard,
);

export default leaderboardRoute;
