import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRoute = Router();

matchRoute.get(
  '/matchs',
  MatchController.findAll,
);

export default matchRoute;
