import Messages from "../models/Messages.js";

export const createMessage = async (req, res) => {
    const message = new Messages(req.body);

    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err)
    }
}

export const getMessage = async (req, res) => {
    try {
        const messages = await Messages.find({conversationId: req.params.conversationId})
        res.status(200).json(messages)

    } catch (err) {
        res.status(500).json(err)
    }

}