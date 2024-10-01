// src/components/Flashcard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Flashcard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => { setFlipped(!flipped); };

  return (
    <Card onClick={handleFlip} sx={{ cursor: 'pointer', minWidth: 275 }}>
      <CardContent>
        <Box sx={{ minHeight: 100 }}>
          <Typography variant="h5" align="center">
            {flipped ? back : front}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Flashcard;
