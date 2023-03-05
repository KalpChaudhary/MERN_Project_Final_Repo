import FlexBetween from "components/FlexBetween";
import { Box } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileSkeleton = () => {
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Skeleton circle width={60} height={60} />
        <Box>
          <Skeleton width={100} height={20} />
          <Skeleton width={80} height={10} />
        </Box>
      </FlexBetween>
      <FlexBetween gap="0.5rem">
        <Skeleton circle width={30} height={30} />
        <Skeleton circle width={30} height={30} />
      </FlexBetween>
    </FlexBetween>
  );
};

export default ProfileSkeleton;
