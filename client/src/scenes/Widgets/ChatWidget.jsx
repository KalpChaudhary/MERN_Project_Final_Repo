import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { Send } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  InputBase,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import MessageWidget from "./MessageWidget";
import { io } from "socket.io-client";
import { API_URL, CHAT_SERVER_URL } from "config";

const ChatWidget = ({ friendId, userId }) => {
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [active, setActive] = useState(false);
  // const [socket, setSocket] = useState(null);
  const socket = useRef();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friend = useSelector(
    (state) => state.user.friends.filter((friend) => friend._id === friendId)[0]
  );

  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  // taking reference of latest msg
  const scrollRef = useRef();

  // scoll to latest msg when messages changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getConversation = async () => {
    const response = await fetch(`${API_URL}/conversations/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const conversation = data.filter((conversation) =>
      conversation.members.includes(friendId)
    );

    if (conversation.length === 0) return;
    setConversationId(conversation[0]._id);
  };

  const getMessages = async () => {
    if (conversationId === "") return;

    const response = await fetch(`${API_URL}/messages/${conversationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setMessages(data);
    // console.log(data);
  };

  const handleSendMessage = async () => {
    if (newMessage === "") return;
    const messageData = {
      conversationId: conversationId,
      sender: userId,
      text: newMessage,
    };

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: friendId,
      text: newMessage,
    });

    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    });

    const data = await response.json();
    setMessages([...messages, data]);
    setNewMessage("");
  };

  useEffect(() => {
    socket.current = io(`ws://${CHAT_SERVER_URL}`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      users.map((user) => user.userId === friendId && setActive(true));
    });
  }, [user, friendId, active]);

  useEffect(() => {
    getConversation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getMessages();
  }, [conversationId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper
      sx={{
        borderRadius: isNonMobileScreen ? "0.75rem" : "0",
      }}
    >
      <FlexBetween pb={"0.8rem"}>
        <FlexBetween gap={"1.5rem"}>
          <UserImage image={friend.picturePath} size="65px" />
          <Box>
            <Typography variant="h4">{`${friend.firstName} ${friend.lastName}`}</Typography>
            <Typography variant="h6" fontWeight="400">
              {friend.occupation}
            </Typography>
          </Box>
        </FlexBetween>
        {active ? (
          <FiberManualRecordRoundedIcon sx={{ color: palette.success.main }} />
        ) : (
          <FiberManualRecordRoundedIcon sx={{ color: palette.error.main }} />
        )}
      </FlexBetween>
      <Box
        p="2rem 0"
        sx={{
          width: "100%",
          height: isNonMobileScreen ? "60vh" : "70vh",
          overflowY: "scroll",
          pr: "1rem",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {messages.map((msg) => (
          <div ref={scrollRef} key={msg._id}>
            <MessageWidget
              msg={msg.text}
              alignment={msg.sender === userId ? "right" : "left"}
              time={msg.createdAt}
            />
          </div>
        ))}
      </Box>
      <FlexBetween pt={"0.8rem"} gap={"1rem"}>
        <InputBase
          sx={{
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            width: "90%",
            height: "3rem",
            padding: "1rem 2rem",
            fontWeight: "300",
          }}
          placeholder="Starts chatting ..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <IconButton
          sx={{
            backgroundColor: palette.primary.light,
            borderRadius: "50%",
            color: palette.neutral.dark,
            padding: "0.8rem",
          }}
          onClick={() => {
            handleSendMessage();
            window.scrollBy(0, 100);
          }}
        >
          <Send />
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChatWidget;
