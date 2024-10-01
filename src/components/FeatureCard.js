// src/components/FeatureCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const FeatureCard = ({ icon, title, description }) => (
  <Card sx={{ 
    textAlign: 'center', 
    minHeight: 250, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }}>
    <CardContent>
      <Box sx={{ mb: 2 }}>{icon}</Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default FeatureCard;