import express, { Request, Response, Router } from 'express';
import cors from 'cors';

import Controller from '../Controller/AuthController';
import UserFields_Validation from '../Middlewares/UserFields_Validation';
import LoginFields_Validation from '../Middlewares/LoginFields_Validation';
import asyncHandler from 'express-async-handler';


const app = express();

app.use(cors());

const router = Router();
const controller = new Controller();

router.post('/login',
LoginFields_Validation.validateFields,
asyncHandler ((req: Request, res: Response) => controller.login(req, res)));

export default router;