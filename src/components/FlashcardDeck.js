// src/components/FlashcardDeck.js
import React from 'react';
import { Box, Button, Typography, Slide, Grow, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { shareFlashcard } from '../store/slices/flashcardsSlice';

const StyledCard = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
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

const FlashcardDeck = ({ flashcards, currentCard, showAnswer, onShowAnswer, onNextCard, onDifficultyRating, onEndReview, dailyGoal, reviewedToday }) => {
  const dispatch = useDispatch();
  if (flashcards.length === 0) {
    return <Typography>No flashcards available.</Typography>;
  }
  const card = flashcards[currentCard];
  const handleShare = () => {
    dispatch(shareFlashcard(card.id));
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Flashcard {currentCard + 1} / {flashcards.length}
      </Typography>
      <LinearProgress variant="determinate" value={(reviewedToday / dailyGoal) * 100} sx={{ mb: 2 }} />
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <StyledCard onClick={onShowAnswer}>
          <Typography variant="h6">
            {showAnswer ? card.answer : card.question}
          </Typography>
        </StyledCard>
      </Slide>
      <Box sx={{ mt: 2 }}>
        {!showAnswer ? (
          <Button variant="outlined" onClick={onShowAnswer} sx={{ mt: 2 }}>
            Show Answer
          </Button>
        ) : (
          <Grow in={showAnswer}>
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>How well did you know this?</Typography>
              <DifficultyButton variant="contained" onClick={() => onDifficultyRating('easy')} difficulty="easy">
                Easy
              </DifficultyButton>
              <DifficultyButton variant="contained" onClick={() => onDifficultyRating('medium')} difficulty="medium">
                Medium
              </DifficultyButton>
              <DifficultyButton variant="contained" onClick={() => onDifficultyRating('hard')} difficulty="hard">
                Hard
              </DifficultyButton>
            </Box>
          </Grow>
        )}
      </Box>
      <Button variant="outlined" onClick={handleShare} sx={{ mt: 2, mr: 2 }}>
        Share Flashcard
      </Button>
      <Button variant="outlined" onClick={onEndReview} sx={{ mt: 2 }}>
        End Review
      </Button>
    </Box>
  );
};
export default FlashcardDeck;