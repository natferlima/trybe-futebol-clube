import { Router } from 'express';
import MatchValidate from '../middlewares/MatchValidate';
import MatchController from '../controllers/MatchController';

const matchRoute = Router();

matchRoute.get(
  '/matchs',
  MatchController.findAll,
);

matchRoute.post(
  '/matchs',
  MatchValidate.verifyClubExists,
  MatchValidate.verifyEqualClubs,
  MatchController.create,
);

export default matchRoute;
