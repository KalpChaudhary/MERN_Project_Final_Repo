import { Box, Typography, Fade, Modal, useMediaQuery } from "@mui/material";

export function AddStoryModalWidget({ open, handleClose }) {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography id="transition-modal-title" variant="h4" component="h2">
              Create a new story
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{
                mt: 2,
              }}
            >
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
