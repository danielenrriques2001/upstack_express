import express from 'express'
import {createUser } from '../controllers/userController.js';
const router = express.Router();


//AUTH, SIGN UP AND USER'S VALIDATION
router.post('/', createUser)

router.post('/', (req, res) => {
    res.send('from api')
})
router.put('/', (req, res) => {
    res.send('from api')
})
router.delete('/', (req, res) => {
    res.send('from api')
})


export default router;