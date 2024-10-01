// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, addUserMessage } from '../store/slices/chatbotSlice';

const Chatbot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatbot.messages);
  const loading = useSelector((state) => state.chatbot.loading);
  const error = useSelector((state) => state.chatbot.error);
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      // Dispatch the user's message to the state
      dispatch(addUserMessage(inputValue));
      // Send the message to the backend AI assistant
      dispatch(sendMessage(inputValue));
      setInputValue('');
    }
  };

  // Send message on "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">AI Tutor Assistant</Typography>
        <Typography variant="body2">Ask me anything!</Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: 'auto',
          backgroundColor: 'background.default',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.from === 'user' ? 'flex-end' : 'flex-start', '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: msg.from === 'user' ? 'primary.main' : 'grey.300',
                color: msg.from === 'user' ? 'primary.contrastText' : 'text.primary',
                maxWidth: '80%',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </Typography>
          </Box>
        ))}
        {loading && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2">Assistant is typing...</Typography>
          </Box>
        )}
        {error && (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', mt: 2 }}>
            Error: {error}
          </Typography>
        )}
        <div ref={messageEndRef} />
      </Box>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        sx={{ p: 2, backgroundColor: 'background.paper' }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'grey.400',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            transition: 'border-color 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
};

export default Chatbot;
