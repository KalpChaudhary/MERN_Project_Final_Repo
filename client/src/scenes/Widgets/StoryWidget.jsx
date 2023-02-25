import { IndividualStoryWidget } from "./IndividualStoryWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "config";

const StoryWidget = ({ userId, picturePath }) => {
  const navigate = useNavigate();

  const [userStory, setUserStory] = useState([]);
  const [friendsStory, setFriendsStory] = useState([]);

  const getStories = useCallback(async () => {
    const [userStoryResponse, friendsStoryResponse] = await Promise.all([
      fetch(`${API_URL}/story/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch(`${API_URL}/story/${userId}/friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    ]);
    const userStory = await userStoryResponse.json();
    const friendsStory = await friendsStoryResponse.json();
    setUserStory(userStory);
    setFriendsStory(friendsStory);
  }, [userId]);

  //  NAvigate to story page
  const handleShowStory = (id) => {
    navigate(`/story/${id}`);
  };

  useEffect(() => {
    getStories();
  }, [getStories]); // eslint-disable-line react-hooks/exhaustive-deps

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <WidgetWrapper mb={"1.5rem"}>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <IndividualStoryWidget
          handleShowStory={() => {
            handleShowStory(userId);
          }}
          picturePath={picturePath}
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
          isUserStory={userStory.length}
          isUser={true}
        />
        {friendsStory.length > 0
          ? friendsStory.map((friend) => (
              <IndividualStoryWidget
                key={friend.userId}
                handleShowStory={() => {
                  handleShowStory(friend.userId);
                }}
                picturePath={friend.userPicturePath}
                handleOpen={handleOpen}
                open={open}
                handleClose={handleClose}
                isUserStory={friend.story}
                isUser={false}
              />
            ))
          : null}
      </Box>
    </WidgetWrapper>
  );
};

export default StoryWidget;
