// src/pages/AddSources.js
import React from 'react';
import { Box, Typography, Modal, Grid, Paper, IconButton, useTheme } from '@mui/material';
import { UploadFile, Mic, YouTube, Edit, MusicNote, VideoFile, Description, Notes, Close } from '@mui/icons-material';

const AddSources = ({ open, onClose, isDarkMode }) => {
  const theme = useTheme();

  const modalStyle = {
    backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.default,
    color: isDarkMode ? theme.palette.text.primary : theme.palette.text.primary,
  };

  const paperStyle = {
    backgroundColor: isDarkMode ? '#333' : theme.palette.background.paper,
    color: isDarkMode ? '#fff' : theme.palette.text.primary,
  };

  // Define sourceOptions array
  const sourceOptions = [
    { icon: <UploadFile />, title: 'Upload File', description: 'Upload a document or image' },
    { icon: <Mic />, title: 'Record Audio', description: 'Record an audio note' },
    { icon: <YouTube />, title: 'YouTube Link', description: 'Add a YouTube video link' },
    { icon: <Edit />, title: 'Write Note', description: 'Write a text note' },
    { icon: <MusicNote />, title: 'Add Music', description: 'Add a music file' },
    { icon: <VideoFile />, title: 'Add Video', description: 'Upload a video file' },
    { icon: <Description />, title: 'Add Document', description: 'Add a document file' },
    { icon: <Notes />, title: 'Add Lecture Notes', description: 'Add lecture notes' },
  ];

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-sources-modal" aria-describedby="add-sources-description">
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}>
        <Paper sx={{ 
          p: 4, 
          width: '70%', 
          maxWidth: '1000px', 
          borderRadius: '8px', 
          position: 'relative',
          ...modalStyle 
        }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'inherit',
            }}
          >
            <Close />
          </IconButton>

          <Typography variant="h4" gutterBottom>
            Aggiungi Materiale
          </Typography>
          <Typography variant="body1" gutterBottom>
            Il materiale che aggiungi verrà utilizzato per personalizzare StudyFetch con il tuo materiale di classe, che può poi essere utilizzato per creare flashcard, quiz, test, chattare con un tutor AI, ecc.
          </Typography>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {sourceOptions.map((option, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    height: '150px',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: isDarkMode ? '#444' : theme.palette.action.hover,
                    },
                    ...paperStyle
                  }}
                >
                  <Box sx={{ fontSize: '40px', mb: 1 }}>{option.icon}</Box>
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {option.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddSources;