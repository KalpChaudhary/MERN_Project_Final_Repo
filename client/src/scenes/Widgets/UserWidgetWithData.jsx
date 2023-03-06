import React from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";


export function UserWidgetWithData({
  totalFriends,
    user,
    userId
}) {

  // styles
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.primary.main;

  // Navigation
  const navigate = useNavigate();


  const {
    firstName,
    lastName,
    location,
    occupation,
    impressions,
    viewedProfile,
    picturePath
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        {/* First row*/}
        <FlexBetween gap="1rem">
          <UserImage image={picturePath}></UserImage>

          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{totalFriends} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* Second row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem " mb="0.5rem">
          <LocationOnOutlined />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem " mb="0.5rem">
          <WorkOutlineOutlined />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      {/* Third row*/}
      <Box p="1rem 0">
        <FlexBetween mb=".5rem">
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* Fourth row*/}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb=".5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="Twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{
              color: main,
            }}
          />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="LinkedIn" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{
              color: main,
            }}
          />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}
