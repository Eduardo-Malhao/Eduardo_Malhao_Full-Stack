import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';

import Controller from '../Controller/UsersController';
import multer from 'multer';

import UserFields_Validation from '../Middlewares/UserFields_Validation';
import TokenValidation from '../Middlewares/TokenValidation';
import upload from '../Middlewares/upload';


const app = express();

app.use(cors());

const router = Router();
const controller = new Controller();

router.post('/create',
  UserFields_Validation.validateFields,
  UserFields_Validation.validateEmail,
  asyncHandler((req: Request, res: Response) => controller.create(req, res)));

router.put('/update/password/:id',
  TokenValidation.validateToken,
  UserFields_Validation.validateUpdatePasswordFields,
  asyncHandler((req: Request, res: Response) => controller.update_password(req, res))
);

router.put('/update/:id',
  TokenValidation.validateToken,
  upload.single('avatar'),
  UserFields_Validation.validateUpdateFields,
  UserFields_Validation.validateEmail,
  asyncHandler((req: Request, res: Response) => controller.update(req, res))
);

router.delete('/delete/:id',
  TokenValidation.validateToken,
  asyncHandler((req: Request, res: Response) => controller.delete(req, res)));

router.get('/list',
  TokenValidation.validateToken,
  asyncHandler((req: Request, res: Response) => controller.getUsersList(req, res)));

router.get('/:id',
  TokenValidation.validateToken,
  asyncHandler((req: Request, res: Response) => controller.getUser(req, res)));

export default router;