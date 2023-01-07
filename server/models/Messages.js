import mongoose from "mongoose";

const messagesSchema =  mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messagesSchema);
export default Messages;
