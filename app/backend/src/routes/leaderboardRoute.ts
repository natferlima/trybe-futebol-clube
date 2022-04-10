import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoute = Router();

leaderboardRoute.get(
  '/leaderboard/home',
  LeaderboardController.leaderboard,
);

leaderboardRoute.get(
  '/leaderboard/away',
  LeaderboardController.leaderboard,
);

leaderboardRoute.get(
  '/leaderboard',
  LeaderboardController.leaderboard,
);

export default leaderboardRoute;
