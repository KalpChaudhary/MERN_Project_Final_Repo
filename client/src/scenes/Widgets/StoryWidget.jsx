import { IndividualStoryWidget } from "./IndividualStoryWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StoryWidget = ({ userId, picturePath }) => {
  const navigate = useNavigate();

  const [userStory, setUserStory] = useState([]);
  const [friendsStory, setFriendsStory] = useState([]);

  const getUserStory = async () => {
    const response = await fetch(`http://localhost:3001/story/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const story = await response.json();
    setUserStory(story);
  };

  const getFriendsStory = async () => {
    const response = await fetch(
      `http://localhost:3001/story/${userId}/friends`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const story = await response.json();
    setFriendsStory(story);
  };

  //  NAvigate to story page
  const handleShowStory = (id) => {
    navigate(`/story/${id}`);
    navigate(0);
  };

  useEffect(() => {
    getUserStory();
    getFriendsStory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <WidgetWrapper mb={"1.5rem"}>
      <Box sx={{display:"flex", gap:"1rem"}}>
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
