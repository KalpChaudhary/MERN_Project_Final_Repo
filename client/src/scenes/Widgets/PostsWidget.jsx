import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import FlexBetween from "components/FlexBetween";
import { Box, Typography } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    //console.log(data);
    dispatch(setPosts({ posts: data }));
    // console.log("Testing");
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    // console.log(data);
  };

  useEffect(() => {
    isProfile ? getUserPosts() : getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // getPosts();

  return (
    <>
      <Box justifyContent="flex-end" display="flex" gap="1rem" mt="1.5rem">
        <Typography sx={{borderBottom: "2px solid #fff"}}>All Posts</Typography>
        <Typography>Following</Typography>
        <Typography>Popular</Typography>
      </Box>
      {posts.map(
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
      )}
    </>
  );
};

export default PostsWidget;
