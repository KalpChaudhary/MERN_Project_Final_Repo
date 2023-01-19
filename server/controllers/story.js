import Story from "../models/Story.js";
import User from "../models/User.js";

export const createStory = async (req, res) => {
  try {
    const { userId, storyImageUrl } = req.body;
    const user = await User.findById(userId);

    const newStory = new Story({
      userId,
      firstName: user.firstName,
      storyImageUrl,
      userPicturePath: user.picturePath,
    });

    await newStory.save();

    const story = await Story.find();

    res.status(201).json(story);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const getFriendsStories = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const friends = user.friends;
    const story = await Story.find({ userId: { $in: friends } });
    res.status(200).json(story);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserStory = async (req, res) => {
    try{
        const { userId } = req.params;
        const story = await Story.find({ userId: userId });
        res.status(200).json(story);

    }catch (err) {
        res.status(404).json({ error: err.message });
    }
}
