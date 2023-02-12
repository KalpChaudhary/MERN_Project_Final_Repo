import React from "react";

import {Box, useTheme,IconButton} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import UserImage from "components/UserImage";
import { AddStoryModalWidget } from "./AddStoryModalWidget";

export function IndividualStoryWidget({
  handleShowStory,
  picturePath,
  handleOpen,
  open,
  handleClose,
  isUserStory,
  isUser
}) {

  const { palette } = useTheme();

  return <Box sx={{
    display: "block",
    borderRadius: "50%",
    mb: 1,
    width: "60px",
    height: "60px",
    position: "relative",
    outline: `${isUserStory === 0 ? "none" : `3px solid ${palette.primary.main}`}` // overflow: "hidden",

  }} onClick={handleShowStory}>
        <UserImage image={picturePath} />
        {isUserStory === 0 && isUser ? <IconButton sx={{
      position: "absolute",
      bottom: -8,
      right: -9,
      color: `${palette.primary.main}`
    }} onClick={handleOpen}>
            <AddCircle />
          </IconButton> : <> </>}

        <AddStoryModalWidget open={open} handleClose={handleClose} />
      </Box>;
}
  