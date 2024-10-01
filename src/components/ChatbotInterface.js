// src/components/ChatbotInterface.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatbotInterface = ({ quiz, userAnswers }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // TODO: Replace this with actual AI response when connecting to backend
    setTimeout(() => {
      const botResponse = `Thank you for your question about the quiz. I'm here to help you understand the topic better. Could you please specify which question you'd like to discuss?`;
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Discuss Your Quiz Results
      </Typography>
      <Paper elevation={3} sx={{ height: 10, overflow: 'auto', p: 2, mb: 2 }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={message.sender === 'user' ? 'You' : 'AI Tutor'}
                secondary={message.text}
                sx={{
                  backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#f1f8e9',
                  borderRadius: 1,
                  p: 1,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask about your quiz results..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{ ml: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotInterface;