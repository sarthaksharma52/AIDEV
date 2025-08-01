import {Router} from 'express';
import {body} from 'express-validator';
import * as projectController from '../controllers/project.controllers.js';
import * as authMiddleWare from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create',
    authMiddleWare.authUser,
    body('name').isString().withMessage('Name is Required'),
    projectController.createProject
)

router.get('/all',
    authMiddleWare.authUser,
    projectController.getAllProject
)

export default router;