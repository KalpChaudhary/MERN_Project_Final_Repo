import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { Send } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  InputBase,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

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
            <Typography variant="h6" fontWeight="400">
              {friend.occupation}
            </Typography>
          </Box>
        </FlexBetween>
        <FiberManualRecordRoundedIcon sx={{ color: palette.success.main }} />
      </FlexBetween>
      <Box p="3rem 0"></Box>
      <FlexBetween>
        <InputBase
          sx={{
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            width: "90%",
            height: "3rem",
            padding: "1rem 2rem",
            fontWeight: "300",
          }}
          placeholder="Starts chatting ..."
        />
        <IconButton
            sx={{
                backgroundColor: palette.primary.light,
                borderRadius: "50%",
                color: palette.neutral.dark,
                padding: "0.8rem",
            }}
        >
          <Send />
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChatWidget;
