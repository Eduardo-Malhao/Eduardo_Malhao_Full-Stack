import express from 'express';
import router from './Router';
import cors from 'cors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.routes();
    this.app.use(cors());
  }

  private config(): void {
      const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);

    // this.app.use(cors({
    //   origin: 'http://localhost:5173',
    //   methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
    //   allowedHeaders: ['Content-Type', 'Authorization'], // defina os headers que usa
    //   credentials: true
    // }));
  }

  private routes(): void { this.app.use(router); }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;