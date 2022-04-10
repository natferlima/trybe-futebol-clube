import * as express from 'express';
import * as cors from 'cors';
import clubRoute from './routes/clubRoute';
import loginRoute from './routes/loginRoute';
import matchRoute from './routes/matchRoute';
import leaderboardRoute from './routes/leaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    // ...
    this.app = express();
    this.config();

    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(loginRoute);
    this.app.use(clubRoute);
    this.app.use(matchRoute);
    this.app.use(leaderboardRoute);
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);

    // ...
  }

  // ...
  public start(PORT: string | number):void {
    // ...

    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
