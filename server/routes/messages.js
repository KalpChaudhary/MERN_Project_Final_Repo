import express from 'express';

import { createMessage, getMessage } from '../controllers/messages.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// create a message
router.post('/',verifyToken,createMessage);

// get a message
router.get('/:conversationId', verifyToken,getMessage);


export default router;