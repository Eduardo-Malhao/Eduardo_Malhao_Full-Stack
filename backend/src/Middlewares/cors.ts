import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/products/:id', function (req: Request, res: Response, next: NextFunction) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
  next();
});

const PORT = 80;
app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
