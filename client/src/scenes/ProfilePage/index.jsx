import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/Navbar";
import MyPostWidget from "scenes/Widgets/MyPostWidget";
import UserWidget from "scenes/Widgets/UserWidget";
import PostsWidget from "scenes/Widgets/PostsWidget";
import FriendListWidget from "scenes/Widgets/FriendListWidget";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfilePage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const { picturePath } = user;

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          flexBasis={isNonMobileScreens ? "26%" : undefined}
        >
          <UserWidget userId={userId} picturePath={picturePath}></UserWidget>
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          <MyPostWidget picturePath={picturePath}></MyPostWidget>
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
