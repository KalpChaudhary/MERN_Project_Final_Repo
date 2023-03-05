import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileSkeleton from "./ProfileSkeleton";

const PostsWidgetSkeleton = ({ cards }) => {
  return Array(cards)
    .fill()
    .map((_, index) => (
      <WidgetWrapper key={index} m="1rem 0">
        <ProfileSkeleton />
        <Skeleton count={2} width={100} height={15} />
        <Skeleton square width={400} height={500} />
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <Skeleton width={30} height={20} />
            </FlexBetween>
            <FlexBetween gap="0.3rem">
              <Skeleton width={30} height={20} />
            </FlexBetween>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>
    ));
};

export default PostsWidgetSkeleton;
