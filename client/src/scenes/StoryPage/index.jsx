import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "scenes/Navbar";
import { useParams } from "react-router-dom";
import StoryPageWidget from "scenes/Widgets/StoryPageWidget";
const StoryPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const {userId} = useParams("userId");
  console.log(userId);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        height="90vh"
        padding="2rem 6%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box >
          <StoryPageWidget userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default StoryPage;
