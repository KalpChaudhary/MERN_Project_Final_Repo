import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Skeleton from "react-loading-skeleton";
import { Box, Divider } from "@mui/material";
import 'react-loading-skeleton/dist/skeleton.css'

const UserWidgetSkeleton = () => {




  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        {/* First row*/}
        <FlexBetween gap="1rem">
          <Skeleton circle width={60} height={60} />
          <Box>
            <Skeleton width={70} height={20} />
            <Skeleton width={125} height={20} />
            <Skeleton width={60} height={10} />
          </Box>
        </FlexBetween>
      </FlexBetween>
      <Divider />

      {/* Second row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem " mb="0.5rem">
          <Skeleton width={100} height={20} />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem " mb="0.5rem">
          <Skeleton width={100} height={20} />
        </Box>
      </Box>

      <Divider />
      {/* Third row*/}
      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Skeleton width={100} height={20} />
          <Skeleton width={50} height={20} />
        </FlexBetween>
        <FlexBetween>
          <Skeleton width={100} height={20} />
          <Skeleton width={50} height={20} />
        </FlexBetween>
      </Box>
      <Divider />
      {/* Fourth row*/}
      <Box p="1rem 0">
        <Skeleton  width={100} height={20} />
        <FlexBetween gap="1rem" mb=".5rem" mt="1rem">
          <FlexBetween gap="1rem">
            <Skeleton circle width={35} height={35} />
            <Box>
              <Skeleton width={100} height={20} />
              <Skeleton width={100} height={10} />
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <Skeleton circle width={35} height={35} />
            <Box>
              <Skeleton width={100} height={20} />
              <Skeleton width={100} height={10} />
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};


export default UserWidgetSkeleton;