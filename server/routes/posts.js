import express from 'express';

import {
    getFeedPosts, 
    getUserPosts,
    likePost,
    addComment
} from "../controllers/posts.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read

router.get('/', verifyToken,getFeedPosts);
router.get('/:userId/posts', verifyToken,getUserPosts);

//Updatse

router.patch('/:id/like',verifyToken, likePost);
router.patch('/:id',verifyToken, addComment);

export default router;