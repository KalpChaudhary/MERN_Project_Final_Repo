import { AddStoryModalWidget } from './AddStoryModalWidget';
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


const StoryWidget = ({ userId, picturePath }) => {
  const { palette } = useTheme();

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
        }}
      >
        <UserImage image={picturePath} />

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
        <AddStoryModalWidget   open={open} handleClose={handleClose}   />
      </Box>
    </WidgetWrapper>
  );
};

export default StoryWidget;
