import { Router } from 'express';
import ClubController from '../controllers/ClubController';

const clubRoute = Router();

clubRoute.get(
  '/clubs',
  ClubController.findAll,
);

clubRoute.get(
  '/clubs/:id',
  ClubController.findById,
);

export default clubRoute;
