// src/components/CreateQuiz.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, Chip, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../store/slices/quizzesSlice';

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuiz({ title, description, questions, tags }));
    setTitle('');
    setDescription('');
    setQuestions([{ text: '', options: ['', '', '', ''], correctAnswer: '' }]);
    setTags([]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create New Quiz</Typography>
      <TextField
        fullWidth
        label="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
        multiline
        rows={2}
      />
      {questions.map((question, index) => (
        <Paper key={index} sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <TextField
            fullWidth
            label={`Question ${index + 1}`}
            value={question.text}
            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          {question.options.map((option, optionIndex) => (
            <TextField
              key={optionIndex}
              fullWidth
              label={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              sx={{ mb: 1 }}
              required
            />
          ))}
          <TextField
            fullWidth
            label="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            sx={{ mb: 1 }}
            required
          />
          <IconButton onClick={() => handleRemoveQuestion(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
      <Button startIcon={<AddIcon />} onClick={handleAddQuestion} sx={{ mb: 2 }}>
        Add Question
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Add Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button onClick={handleAddTag} variant="outlined">
          Add Tag
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {tags.map((t) => (
          <Chip key={t} label={t} onDelete={() => handleRemoveTag(t)} />
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Create Quiz
      </Button>
    </Box>
  );
};

export default CreateQuiz;