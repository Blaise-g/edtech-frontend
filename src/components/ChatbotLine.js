// src/components/ChatbotLine.js
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const ChatbotLine = () => {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: 'primary.light',
        borderRadius: 2,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '@keyframes rotate': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        What do you want to learn today?
      </Typography>
      {/* Placeholder for suggested subjects */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="secondary">
          Mathematics
        </Button>
        <Button variant="contained" color="secondary">
          Science
        </Button>
        <Button variant="contained" color="secondary">
          History
        </Button>
      </Stack>
      {/* Add subtle animation */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          width: 100,
          height: 100,
          backgroundColor: 'primary.dark',
          borderRadius: '50%',
          opacity: 0.1,
          animation: 'rotate 20s linear infinite',
        }}
      />
    </Box>
  );
};

export default ChatbotLine;
