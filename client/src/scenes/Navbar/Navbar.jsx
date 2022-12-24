import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Typography,
  Select,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {

  const [isMobilemenuToggled, setIsMobilemenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user  = useSelector(state => state.user);
  const isMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  
  const neutralLight = theme.palette.neutral.light;
  const neutralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  
  return (
    <div className="navbar">
      <h1>Navbar</h1>
    </div>
  );
};

export default Navbar;
