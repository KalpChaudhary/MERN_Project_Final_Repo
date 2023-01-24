import { AddStoryModalWidget } from "./AddStoryModalWidget";
import WidgetWrapper from "components/WidgetWrapper";
import {
  Box,
  useTheme,
  Backdrop,
  Modal,
  Fade,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import UserImage from "components/UserImage";
import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const StoryWidget = ({ userId, picturePath }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [userStory, setUserStory] = useState([]);

  const getUserStory = async () => {
    const response = await fetch(`http://localhost:3001/story/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const story = await response.json();
    setUserStory(story);
  };

  //  NAvigate to story page
  const handleShowStory = () => {
    navigate(`/story/${userId}`);
    navigate(0);
  };

  useEffect(() => {
    getUserStory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // stories
  const stories = useSelector((state) => state.stories);

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <WidgetWrapper mb={"1.5rem"}>
      <Box
        sx={{
          display: "block",
          borderRadius: "50%",
          mb: 1,
          width: "60px",
          height: "60px",
          position: "relative",
          outline: `${userStory.length === 0 ? "none" : `3px solid ${palette.primary.main}`}`,
          // overflow: "hidden",
        }}
        onClick={handleShowStory}

      >
        <UserImage image={picturePath} />
        {userStory.length === 0 ? (
          <IconButton
            sx={{
              position: "absolute",
              bottom: -8,
              right: -9,
              color: `${palette.primary.main}`,
            }}
            onClick={handleOpen}
          >
            <AddCircle />
          </IconButton>
        ): (<> </>)}

        <AddStoryModalWidget open={open} handleClose={handleClose} />
      </Box>
    </WidgetWrapper>
  );
};

export default StoryWidget;
