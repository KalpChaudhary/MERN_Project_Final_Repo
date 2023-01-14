import { Box, Typography, useMediaQuery } from "@mui/material";
import ChatWidget from "scenes/Widgets/ChatWidget";
import Navbar from "scenes/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ChatPage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const {friendId} = useParams("friendId");
    const user = useSelector((state) => state.user);
   // console.log(user._id);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "50%" : "90%"}>
            <ChatWidget friendId={friendId} userId = {user._id} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
