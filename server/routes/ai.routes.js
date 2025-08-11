import {Router} from 'express';
import * as aiControllers from '../controllers/ai.controllers.js'

const router = Router();

router.get('/get-result',aiControllers.getResult)

export default router;