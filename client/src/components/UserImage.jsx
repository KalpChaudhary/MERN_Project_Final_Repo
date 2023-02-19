import { Box } from "@mui/material";
import { API_URL } from "config";


const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`${API_URL}/assets/${image}`}
        alt="User"
        style={{ objectFit: "cover" , borderRadius : "50%"}}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;

