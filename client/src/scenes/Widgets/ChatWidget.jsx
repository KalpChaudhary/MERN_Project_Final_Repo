import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

const ChatWidget = ({ friendId }) => {
 
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friend = useSelector(
    (state) => state.user.friends.filter((friend) => friend._id === friendId)[0]
  );
 
  //   console.log(friend.firstName);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <FlexBetween gap={"1.5rem"}>
          <UserImage image={friend.picturePath} size="65px" />
          <Box>
            <Typography variant="h4">{`${friend.firstName} ${friend.lastName}`}</Typography>
            <Typography variant="h6" fontWeight="400" >{friend.occupation}</Typography>
          </Box>
        </FlexBetween>
          <FiberManualRecordRoundedIcon sx={{color: palette.success.main}} />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChatWidget;
