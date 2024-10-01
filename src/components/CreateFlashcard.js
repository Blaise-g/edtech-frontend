// src/components/CreateFlashcard.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addFlashcard } from '../store/slices/flashcardsSlice';

const CreateFlashcard = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

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
    if (question && answer) {
      dispatch(addFlashcard({ question, answer, tags }));
      setQuestion('');
      setAnswer('');
      setTags([]);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Create New Flashcard</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }}>
        <TextField
          fullWidth
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          multiline
          rows={3}
        />
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
          Create Flashcard
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateFlashcard;