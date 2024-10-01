// src/components/ChatbotWidget.js
import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Chatbot from './Chatbot';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggleChatbot = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        color="secondary"
        onClick={handleToggleChatbot}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: theme.zIndex.tooltip,
          '&:hover': {
            backgroundColor: 'secondary.dark',
          },
          transition: 'background-color 0.3s ease',
        }}
      >
        <ChatIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleToggleChatbot}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            m: 1,
            maxHeight: 'calc(100% - 64px)',
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          AI Tutor Assistant
          <IconButton
            aria-label="close"
            onClick={handleToggleChatbot}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Chatbot />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatbotWidget;
