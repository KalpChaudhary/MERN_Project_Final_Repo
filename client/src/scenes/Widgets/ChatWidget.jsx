import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { Send } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  InputBase,
  IconButton,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import MessageWidget from "./MessageWidget";
import { io } from "socket.io-client";

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

  const getConversation = async () => {
    const response = await fetch(
      `http://localhost:3001/conversations/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const conversation = data.filter((conversation) =>
      conversation.members.includes(friendId)
    );

    if (conversation.length === 0) return;
    setConversationId(conversation[0]._id);
  };

  const getMessages = async () => {
    if (conversationId === "") return;

    const response = await fetch(
      `http://localhost:3001/messages/${conversationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    const response = await fetch(`http://localhost:3001/messages`, {
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
    socket.current = io("ws://localhost:3002");
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
    <WidgetWrapper>
      <FlexBetween>
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
      <Box p="2rem 0">
        {messages.map((msg) => (
          <MessageWidget
            key={msg._id}
            msg={msg.text}
            alignment={msg.sender === userId ? "right" : "left"}
            time={msg.createdAt}
          />
        ))}
      </Box>
      <FlexBetween gap={"1rem"}>
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
          onClick={handleSendMessage}
        >
          <Send />
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ChatWidget;
