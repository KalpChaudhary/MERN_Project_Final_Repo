import express from 'express';
import { verify } from 'jsonwebtoken';

import {
    getFriendsStories,
    getUserStory,
    
} from "../controllers/story.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get all stories of friends
router.get("/:userId/friends", getFriendsStories);

// Get a story of a user
router.get("/:userId", getUserStory);

export default router;