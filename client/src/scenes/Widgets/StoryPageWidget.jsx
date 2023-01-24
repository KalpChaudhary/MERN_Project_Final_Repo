import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import StoryImage from "components/StoryImage";

const StoryPageWidget = ({ userId }) => {
  const [story, setStory] = useState(null);
  const {palette} = useTheme();

  const getStory = async () => {
    const response = await fetch(`http://localhost:3001/story/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const story = await response.json();
    setStory(story);
  };

  useEffect(() => {
    getStory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        width: "350px",
        height: "600px",
        background: `${palette.background.alt}`,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {story && <StoryImage image={story[0].storyImageUrl} />}
    </Box>
  );
};

export default StoryPageWidget;
