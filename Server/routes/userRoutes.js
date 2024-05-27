import express from 'express';
import validateFields from '../middlewares/validateFields.js';
import { handleSignup, handleLogIn } from '../controllers/userController.js';

const router = express.Router()

router.post('/signup', validateFields(['name', 'surname', 'username', 'email', 'password']), handleSignup);
router.post('/login', validateFields(['username', 'password']), handleLogIn);

export default router;