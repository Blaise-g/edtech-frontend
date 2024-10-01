// src/components/FlashcardOverview.js
import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FlashcardOverview = ({ flashcards, onStartReview }) => {
  const dueToday = flashcards.filter(card => new Date(card.nextReview) <= new Date()).length;
  const dueTomorrow = flashcards.filter(card => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(card.nextReview) > new Date() && new Date(card.nextReview) <= tomorrow;
  }).length;

  const pieData = [
    { name: 'Due Today', value: dueToday },
    { name: 'Due Tomorrow', value: dueTomorrow },
    { name: 'Later', value: flashcards.length - dueToday - dueTomorrow },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Mock data for the progress chart
  const progressData = [
    { date: '2023-05-01', mastery: 0.2 },
    { date: '2023-05-02', mastery: 0.3 },
    { date: '2023-05-03', mastery: 0.4 },
    { date: '2023-05-04', mastery: 0.6 },
    { date: '2023-05-05', mastery: 0.7 },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Flashcard Overview</Typography>
            <Typography>Total Flashcards: {flashcards.length}</Typography>
            <Typography>Due Today: {dueToday}</Typography>
            <Typography>Due Tomorrow: {dueTomorrow}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={onStartReview} 
              sx={{ mt: 2 }}
              size="large"
            >
              Start Review
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Due Cards</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {pieData.map((entry, index) => (
                <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                  <Box sx={{ width: 10, height: 10, backgroundColor: COLORS[index], mr: 1 }} />
                  <Typography variant="body2">{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Mastery Progress</Typography>
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
      </Grid>
    </Box>
  );
};

export default FlashcardOverview;