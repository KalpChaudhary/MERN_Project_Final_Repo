import { Box, Typography, useMediaQuery } from "@mui/material";
import ChatWidget from "scenes/Widgets/ChatWidget";
import Navbar from "scenes/Navbar";
import { useParams } from "react-router-dom";
const ChatPage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {friendId} = useParams("friendId");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        display="flex"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "50%" : "80%"}>
            <ChatWidget friendId={friendId}/>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
