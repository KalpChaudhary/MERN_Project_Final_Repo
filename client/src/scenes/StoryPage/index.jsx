import { Box } from "@mui/material";
import Navbar from "scenes/Navbar";
import { useParams } from "react-router-dom";
import StoryPageWidget from "scenes/Widgets/StoryPageWidget";
const StoryPage = () => {
  const {userId} = useParams("userId");

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
