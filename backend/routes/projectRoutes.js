import express from 'express'
import checkAuth from '../middleware/checkAuth.js'

import {
    getProjects,
    getProject,
    editProject,
    createProject,
    addCollaborator,
    deleteProject,
    deleteCollaborator,
   
} from '../controllers/projectControllers.js'


const router = express.Router();
router
    .route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject)

router
    .route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject)


router.post('/add-collaborator/:id', checkAuth, addCollaborator);
router.post('/delete-collaborator/:id', checkAuth, deleteCollaborator);


export default router;