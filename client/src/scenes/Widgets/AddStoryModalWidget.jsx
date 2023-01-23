import {
  Box,
  Typography,
  Fade,
  Modal,
  useMediaQuery,
  Divider,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { setStories } from "state";
import { useDispatch, useSelector } from "react-redux";

export function AddStoryModalWidget({ open, handleClose }) {
  const [image, setImage] = useState(null);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { _id, firstName, picturePath } = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();

  // get User Story

  const handleAddStory = async () => {
    const formData = new FormData();

    formData.append("userId", _id);
    formData.append("firstName", firstName);
    formData.append("userPicturePath", picturePath);

    if (image) {
      formData.append("picture", image);
      formData.append("storyImageUrl", image.name);
    }

    const response = await fetch(`http://localhost:3001/story`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const stories = await response.json();
    dispatch(setStories(stories));
    setImage(null);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${isNonMobileScreens ? "35%" : "80%"}`,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <FlexBetween
            sx={{
              flexDirection: `column`,
              gap: "1rem",
            }}
          >
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Create a new story
            </Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
            {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}></Dropzone> */}
            <Box m="1rem 0" width={"80%"}>
              <Dropzone
                accetedFiles=".jpeg,.jpg,.png"
                multiple={false}
                onDrop={(accetedFiles) => setImage(accetedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}

                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "8%", m: "0 0 0 0.5rem" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </Box>
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
            <Button
              sx={{
                width: "50%",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                borderRadius: "3rem",
                "&:hover": { backgroundColor: palette.primary.dark },
              }}
              onClick={handleAddStory}
            >
              Post
            </Button>
          </FlexBetween>
        </Box>
      </Fade>
    </Modal>
  );
}
