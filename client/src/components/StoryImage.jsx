import { Box } from "@mui/material";

const StoryImage = ({ image }) => {
  return (
    <Box>
      <img
        src={`${process.env.API_URL}/assets/${image}`}
        alt="User"
        style={{ objectFit: "cover" , width: "100%", height: "100%"}}
      />
    </Box>
  );
};

export default StoryImage;
