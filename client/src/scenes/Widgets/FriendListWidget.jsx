import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography variant="h5" fontWeight="500" color={palette.neutral.dark} sx={{mb: "1.5rem"}}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {friends.map((friend) => (
        <Friend key={friend._id} friendId={friend._id} name={`${friend.firstName} ${friend.lastName}`} subTitle={friend.occupation} userPicturePath={friend.picturePath} temp = "h2" />
      ))}
      </Box>
      
      
    </WidgetWrapper>
  );
};

export default FriendListWidget;
