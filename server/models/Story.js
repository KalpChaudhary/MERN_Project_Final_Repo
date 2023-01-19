import mongoose from "mongoose";


const storySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    storyImageUrl: {
        type: String,
        required: true,
    },
    userPicturePath: {
        type: String,
        required: true,
    }
},{ timestamps: true });

const Story = mongoose.model("Story", storySchema);
export default Story;