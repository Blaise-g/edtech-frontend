// src/components/FlashcardDashboard.js
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FlashcardDashboard = ({ flashcards }) => {
  // Mock data for the chart
  const progressData = [
    { date: '2023-05-01', mastery: 0.2 },
    { date: '2023-05-02', mastery: 0.3 },
    { date: '2023-05-03', mastery: 0.4 },
    { date: '2023-05-04', mastery: 0.6 },
    { date: '2023-05-05', mastery: 0.7 },
  ];

  const streak = 5; // Mock streak data
  const totalReviews = 100; // Mock total reviews

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Mastery Progress</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mastery" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Statistics</Typography>
            <Typography>Total Flashcards: {flashcards.length}</Typography>
            <Typography>Current Streak: {streak} days</Typography>
            <Typography>Total Reviews: {totalReviews}</Typography>
            <Typography>Average Mastery: {(flashcards.reduce((sum, card) => sum + card.mastery, 0) / flashcards.length).toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlashcardDashboard;