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
    searchCollaborator
   
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


router.post('/collaborators', checkAuth, searchCollaborator);
router.post('/collaborators/:id', checkAuth, addCollaborator);
router.post('/delete-collaborators/:id', checkAuth, deleteCollaborator);


export default router;