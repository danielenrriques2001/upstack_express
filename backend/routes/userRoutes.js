import express from 'express'
import {
    createUser, 
    authenticate, 
    confirmUser, 
    recoverPassword, 
    validateToken, 
    createNewPassword,
    profile 
} from '../controllers/userController.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = express.Router();


//AUTH, SIGN UP AND USER'S VALIDATION
router.post('/', createUser)
router.post('/login', authenticate)
router.get('/confirm/:token', confirmUser)
router.post('/recover-password', recoverPassword)
router.route('/recover-password/:token')
    .get(validateToken)
    .post(createNewPassword)
router.get('/profile', checkAuth, profile)



export default router;