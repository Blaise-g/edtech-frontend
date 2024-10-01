// src/pages/Flashcards.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, TextField, Paper, Grid, Tabs, Tab } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FlashcardOverview from '../components/FlashcardOverview';
import FlashcardReview from '../components/FlashcardReview';
import CreateFlashcard from '../components/CreateFlashcard';
import TagManager from '../components/TagManager';
import { fetchFlashcards } from '../store/slices/flashcardsSlice';

const Flashcards = () => {
  const dispatch = useDispatch();
  const { items: flashcards, status, error } = useSelector(state => state.flashcards);
  const [isReviewing, setIsReviewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFlashcards());
    }
  }, [status, dispatch]);


  const handleStartReview = () => {
    setIsReviewing(true);
  };

  const handleEndReview = () => {
    setIsReviewing(false);
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  const filteredFlashcards = flashcards.filter(card => 
    card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Flashcards
      </Typography>
      {!isReviewing ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search flashcards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
                <Tab label="Overview" />
                <Tab label="Create" />
                <Tab label="Manage Tags" />
              </Tabs>
            </Grid>
<Grid item xs={12}>
              {activeTab === 0 && <FlashcardOverview flashcards={filteredFlashcards} onStartReview={handleStartReview} />}
              {activeTab === 1 && <CreateFlashcard />}
              {activeTab === 2 && flashcards && flashcards.length > 0 && (
                <TagManager items={flashcards} itemType="flashcard" />
              )}
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <FlashcardReview flashcards={filteredFlashcards} onEndReview={handleEndReview} />
      )}
    </Box>
  );
};

export default Flashcards;