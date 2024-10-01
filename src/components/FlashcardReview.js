// src/components/FlashcardReview.js
import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Slide } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { updateFlashcard } from '../store/slices/flashcardsSlice';

const StyledCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const DifficultyButton = styled(Button)(({ theme, difficulty }) => ({
  margin: theme.spacing(1),
  backgroundColor: difficulty === 'easy' ? '#4caf50' : difficulty === 'medium' ? '#ff9800' : '#f44336',
  '&:hover': {
    backgroundColor: difficulty === 'easy' ? '#45a049' : difficulty === 'medium' ? '#f57c00' : '#d32f2f',
  },
}));

const FlashcardReview = ({ flashcards, onEndReview }) => {
  const dispatch = useDispatch();
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (flashcards.length === 0) {
    return <Typography>No flashcards available.</Typography>;
  }

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handleDifficultyRating = (difficulty) => {
    dispatch(updateFlashcard({ id: flashcards[currentCard].id, difficulty }));
    handleNextCard();
  };

  const card = flashcards[currentCard];

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Flashcard {currentCard + 1} / {flashcards.length}
      </Typography>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <StyledCard onClick={handleShowAnswer}>
          <Typography variant="h6">
            {showAnswer ? card.answer : card.question}
          </Typography>
        </StyledCard>
      </Slide>
      <Box sx={{ mt: 2 }}>
        {!showAnswer ? (
          <Button variant="outlined" onClick={handleShowAnswer} sx={{ mt: 2 }}>
            Show Answer
          </Button>
        ) : (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>How well did you know this?</Typography>
            <DifficultyButton variant="contained" onClick={() => handleDifficultyRating('easy')} difficulty="easy">
              Easy
            </DifficultyButton>
            <DifficultyButton variant="contained" onClick={() => handleDifficultyRating('medium')} difficulty="medium">
              Medium
            </DifficultyButton>
            <DifficultyButton variant="contained" onClick={() => handleDifficultyRating('hard')} difficulty="hard">
              Hard
            </DifficultyButton>
          </Box>
        )}
      </Box>
      <Button variant="outlined" onClick={onEndReview} sx={{ mt: 2 }}>
        End Review
      </Button>
    </Box>
  );
};

export default FlashcardReview;