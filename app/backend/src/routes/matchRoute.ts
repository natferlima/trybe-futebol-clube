import { Router } from 'express';
import MatchValidate from '../middlewares/MatchValidate';
import MatchController from '../controllers/MatchController';
// import TokenValidate from '../middlewares/TokenValidate';

const matchRoute = Router();

matchRoute.get(
  '/matchs',
  MatchController.findAll,
);

matchRoute.post(
  '/matchs',
  // TokenValidate.jwtValidate,
  MatchValidate.verifyClubExists,
  MatchValidate.verifyEqualClubs,
  MatchController.create,
);

matchRoute.patch(
  '/matchs/:id/finish',
  MatchValidate.verifyMatchExists,
  MatchController.updateInProgressToFinish,
);

export default matchRoute;
