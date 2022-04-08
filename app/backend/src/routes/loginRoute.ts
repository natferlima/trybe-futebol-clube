import { Router } from 'express';
import LoginValidate from '../middlewares/LoginValidate';
import LoginController from '../controllers/LoginController';

const loginRoute = Router();

loginRoute.post(
  '/login',
  LoginValidate.fildsValidate,
  LoginValidate.emailAndPassValidate,
  LoginValidate.userExists,
  LoginController.login,
);

loginRoute.get(
  '/login/validate',
  LoginController.loginValidate,
);

export default loginRoute;
