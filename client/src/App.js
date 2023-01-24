import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import HomePage from "./scenes/HomePage";
import LoginPage from "./scenes/LoginPage";
import ProfilePage from "./scenes/ProfilePage";
import ChatPage from "./scenes/ChatPage";
import Navbar from "scenes/Navbar";
import StoryPage from "scenes/StoryPage";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* <Route path="/" element={<Navbar />} /> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/navbar" element={<Navbar />} />
            {/* <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/chat/:friendId" element={<ChatPage />} /> */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/chat/:friendId"
              element={isAuth ? <ChatPage /> : <Navigate to="/" />}
            />
            <Route 
            path="/story/:userId"
            element={isAuth ? <StoryPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
