import express from 'express';

import { createMessage, getMessage } from '../controllers/messages.js';


const router = express.Router();

// create a message
router.post('/', createMessage);

// get a message
router.get('/:conversationId', getMessage);


export default router;