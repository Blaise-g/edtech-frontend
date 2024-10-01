// src/components/QuizReview.js
import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const QuizReview = ({ quiz, userAnswers }) => {
  // TODO: When connecting to backend, fetch detailed quiz results from API
  // This should include correct answers, explanations, and any additional feedback

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Quiz Review
      </Typography>
      <List>
        {quiz.questions.map((question, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Question ${index + 1}: ${question.text}`}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    Your answer: {userAnswers[index]}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    Correct answer: {question.correctAnswer}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2">
                    Explanation: {question.explanation}
                  </Typography>
                  {/* TODO: Add additional feedback or hints from backend */}
                  {/* <Typography component="span" variant="body2" color="text.secondary">
                    Additional feedback: {question.additionalFeedback}
                  </Typography> */}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* TODO: When connecting to backend, consider adding overall feedback or study recommendations based on quiz performance */}
    </Box>
  );
};

export default QuizReview;