import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { API_URL } from "config";
import PostsWidgetSkeleton from "scenes/Skeletons/PostsWidgetSkeleton";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [active, setActive] = useState("suggested");

  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    //console.log(data);
    dispatch(setPosts({ posts: data }));
    // console.log("Testing");

    if (data) {
      setIsLoading(false);
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(`${API_URL}/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    // console.log(data);

    if (data) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isProfile ? getUserPosts() : getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // getPosts();

  const handleActivePostsFilter = (event, newActive) => {
    setActive(newActive);

    if (newActive === "following") {
      const followingPosts = posts.filter((post) =>
        user.friends.map((friend) => friend._id).includes(post.userId)
      );
      dispatch(setPosts({ posts: followingPosts }));
    }
    if (newActive === "suggested") {
      getPosts();
      //dispatch(setPosts({ posts: posts }));
    }
  };

  return (
    <>
      {!isProfile && (
        <Box display="flex" justifyContent="flex-end" mt="1rem">
          <ToggleButtonGroup
            onChange={handleActivePostsFilter}
            color={"primary"}
            value={active}
            exclusive
            aria-label="Platform"
            sx={{ "&>*": { border: "none" } }}
          >
            <ToggleButton value="following">Following</ToggleButton>
            <ToggleButton value="popular">Popular</ToggleButton>
            <ToggleButton value="suggested">Suggested</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      {isLoading ? (
        <PostsWidgetSkeleton cards={5} />
      ) : (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            comments,
            picturePath,
            userPicturePath,
            likes,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              comments={comments}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
