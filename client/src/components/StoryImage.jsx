import { Box } from "@mui/material";

const StoryImage = ({ image }) => {
  return (
    <Box>
      <img
        src={`http://localhost:3001/assets/${image}`}
        alt="User"
        style={{ objectFit: "cover" , width: "100%", height: "100%"}}
      />
    </Box>
  );
};

export default StoryImage;
