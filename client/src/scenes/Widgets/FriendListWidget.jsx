import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { useEffect } from "react";
import { setFriends } from "state";

const FriendListWidget = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper>
      <Typography variant="h5" fontWeight="500" color={palette.neutral.dark}>Friend List</Typography>
      
        {friends.map((friend) => (
          <Box margin={"1rem 0"}>
          <Friend
            friendId={friend._id}
            name={friend.firstName + " " + friend.lastName}
            subTitle={friend.occupation}
            userPicturePath={friend.picturePath}
            margin="0.5rem 0"
          />
          </Box>
        ))}
      
    </WidgetWrapper>
  );
};

export default FriendListWidget;
