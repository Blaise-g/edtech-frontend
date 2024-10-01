// src/components/QuizDashboard.js
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const QuizDashboard = ({ quizzes }) => {
  const completedQuizzes = quizzes.filter(q => q.completed);
  const averageScore = completedQuizzes.length > 0
    ? completedQuizzes.reduce((sum, q) => sum + q.score, 0) / completedQuizzes.length
    : 0;

  const completionData = [
    { name: 'Completed', value: completedQuizzes.length },
    { name: 'Remaining', value: quizzes.length - completedQuizzes.length },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  // Mock data for progress over time
  const progressData = [
    { date: '2023-05-01', score: 70 },
    { date: '2023-05-05', score: 75 },
    { date: '2023-05-10', score: 80 },
    { date: '2023-05-15', score: 85 },
    { date: '2023-05-20', score: 90 },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Quiz Performance Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Quiz Completion</Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={completionData}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Progress Over Time</Typography>
            <LineChart width={300} height={300} data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizDashboard;