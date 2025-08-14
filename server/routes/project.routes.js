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

router.put('/add-user', 
    authMiddleWare.authUser,
    body('projectId').isString().withMessage('ProjectId is required'),
    body('users')
        .isArray({ min: 1 }).withMessage('users must be an array of strings')
        .bail()
        .custom((users) => users.every(user => typeof user === 'string'))
        .withMessage('Each user must be a string'),
    projectController.addUserToProject
);

router.get('/get-project/:projectId',
    authMiddleWare.authUser,
    projectController.getProjectById    
);

// router.put('/update-file-tree',
//   authMiddleWare.authUser,
//   body('projectId').isString().withMessage('Project Id is Required'),
//   body('fileTree')
//     .custom(value => typeof value === 'object' && value !== null)
//     .withMessage('File Tree is Required'),
//   projectController.updateFileTree
// );


router.put('/update-file-tree',
    authMiddleWare.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('fileTree').isObject().withMessage('File tree is required'),
    projectController.updateFileTree
)

export default router;