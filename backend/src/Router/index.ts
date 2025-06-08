import { Router } from 'express';

import auth from "./AuthRouter";
import users from "./UserRouter";

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

router.get('/ping', (_req, res) => { res.send('pong') });

export default router;