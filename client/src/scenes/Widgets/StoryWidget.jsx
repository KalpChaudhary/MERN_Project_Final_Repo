import WidgetWrapper from "components/WidgetWrapper";
import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import UserImage from "components/UserImage";
import { AddCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const StoryWidget = ({ userId, picturePath }) => {
  const { palette } = useTheme();

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
        >
          <AddCircle />
        </IconButton>
      </Box>
    </WidgetWrapper>
  );
};

export default StoryWidget;
