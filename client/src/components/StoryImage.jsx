import { Box } from "@mui/material";
import { API_URL } from "config";

const StoryImage = ({ image }) => {
  return (
    <Box>
      <img
        src={`${API_URL}/assets/${image}`}
        alt="User"
        style={{ objectFit: "cover" , width: "100%", height: "100%"}}
      />
    </Box>
  );
};

export default StoryImage;
