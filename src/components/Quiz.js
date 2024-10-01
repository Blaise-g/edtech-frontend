// src/components/Quiz.js
import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';

const Quiz = ({ quiz, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);

  const handleAnswerChange = (event) => {
    setAnswers({ ...answers, [currentQuestionIndex]: event.target.value });
  };

  const handleNext = () => {
    setShowHint(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setShowHint(false);
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {currentQuestion.text}
      </Typography>
      {currentQuestion.type === 'multiple-choice' ? (
        currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            variant={answers[currentQuestionIndex] === option ? 'contained' : 'outlined'}
            onClick={() => handleAnswerChange({ target: { value: option } })}
            sx={{ mr: 1, mb: 1 }}
          >
            {option}
          </Button>
        ))
      ) : (
        <TextField
          fullWidth
          multiline
          rows={4}
          value={answers[currentQuestionIndex] || ''}
          onChange={handleAnswerChange}
          sx={{ mb: 2 }}
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleShowHint} sx={{ mr: 1 }}>
          Get Hint
        </Button>
        {currentQuestionIndex > 0 && (
          <Button variant="outlined" onClick={handlePrevious} sx={{ mr: 1 }}>
            Previous
          </Button>
        )}
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
      </Box>
      {showHint && (
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          Hint: {currentQuestion.hint}
        </Typography>
      )}
    </Box>
  );
};

export default Quiz;