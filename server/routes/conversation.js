import express from "express";
import Conversation from "../models/Conversation.js";
import { createConversation, getConversation } from "../controllers/conversation.js";

const router = express.Router();

// Create a conversation
router.post("/", createConversation)

// Get a conversation
router.get("/:userId", getConversation);

export default router;
