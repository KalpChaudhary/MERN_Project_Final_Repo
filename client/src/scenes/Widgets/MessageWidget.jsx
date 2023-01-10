import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setFriends } from "state";
import { useTheme } from "@emotion/react";
const MessageWidget = ({ msg, alignment = "left", time }) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: alignment,
        mb: "0.5rem",
      }}
    >
      <Typography
        maxWidth={"60%"}
        p="0.5rem 1.5rem"
        borderRadius="2rem"
        backgroundColor={
          alignment === "left" ? palette.primary.light : palette.neutral.light
        }
        variant="h4"
      >
        {msg}
      </Typography>

    </Box>
  );
};

export default MessageWidget;
