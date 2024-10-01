// src/components/DailyGoalSetter.js
import React, { useState } from 'react';
import { Box, Typography, Slider, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDailyGoal } from '../store/slices/flashcardsSlice';

const DailyGoalSetter = () => {
  const dispatch = useDispatch();
  const { dailyGoal, reviewedToday } = useSelector(state => state.flashcards);
  const [tempGoal, setTempGoal] = useState(dailyGoal);

  const handleSaveGoal = () => {
    dispatch(setDailyGoal(tempGoal));
  };

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Daily Goal</Typography>
      <Typography>
        Progress: {reviewedToday} / {dailyGoal} flashcards reviewed
      </Typography>
      <Slider
        value={tempGoal}
        onChange={(e, newValue) => setTempGoal(newValue)}
        aria-labelledby="daily-goal-slider"
        valueLabelDisplay="auto"
        step={5}
        marks
        min={5}
        max={100}
        sx={{ mt: 2, mb: 2 }}
      />
      <Button onClick={handleSaveGoal} variant="contained">
        Save New Goal
      </Button>
    </Box>
  );
};

export default DailyGoalSetter;