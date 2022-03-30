import { Router } from 'express';
import LoginValidate from '../middlewares/LoginValidate';
import LoginController from '../controllers/LoginController';

const loginRoute = Router();

loginRoute.post(
  '/login',
  LoginValidate.fildsValidate,
  LoginValidate.emailAndPassValidate,
  LoginController.login,
);

export default loginRoute;
