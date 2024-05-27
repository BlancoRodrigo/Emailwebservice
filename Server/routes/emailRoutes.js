import express from 'express';
import { getInboxEmails, sendEmail, getSentEmails } from '../controllers/emailController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/inbox', authMiddleware, getInboxEmails);
router.post('/send', authMiddleware, sendEmail);
router.get('/sent', authMiddleware, getSentEmails);



export default router;