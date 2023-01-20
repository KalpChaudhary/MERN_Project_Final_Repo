import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/Navbar";
import MyPostWidget from "scenes/Widgets/MyPostWidget";
import UserWidget from "scenes/Widgets/UserWidget";
import PostsWidget from "scenes/Widgets/PostsWidget";
import FriendListWidget from "scenes/Widgets/FriendListWidget";
import StoryWidget from "scenes/Widgets/StoryWidget";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <StoryWidget userId={_id} picturePath={picturePath}></StoryWidget>
          <MyPostWidget picturePath={picturePath}></MyPostWidget>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box
            flexBasis="26%"
            diaplay="flex"
            flexDirection="column"
            gap="1.5rem"
          >
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
