// src/components/TagManager.js
import React, { useState } from 'react';
import { Box, Typography, Chip, TextField, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateFlashcard } from '../store/slices/flashcardsSlice';
import { updateQuiz } from '../store/slices/quizzesSlice';

const TagManager = ({ items, itemType }) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && selectedItem) {
      const updatedTags = [...selectedItem.tags, newTag];
      if (itemType === 'flashcard') {
        dispatch(updateFlashcard({ id: selectedItem.id, tags: updatedTags }));
      } else if (itemType === 'quiz') {
        dispatch(updateQuiz({ id: selectedItem.id, tags: updatedTags }));
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (selectedItem) {
      const updatedTags = selectedItem.tags.filter(tag => tag !== tagToRemove);
      if (itemType === 'flashcard') {
        dispatch(updateFlashcard({ id: selectedItem.id, tags: updatedTags }));
      } else if (itemType === 'quiz') {
        dispatch(updateQuiz({ id: selectedItem.id, tags: updatedTags }));
      }
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Manage Tags</Typography>
      <Box sx={{ mb: 2 }}>
        {items.map(item => (
          <Chip
            key={item.id}
            label={itemType === 'flashcard' ? item.question : item.title}
            onClick={() => setSelectedItem(item)}
            color={selectedItem?.id === item.id ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      {selectedItem && (
        <Box>
          <Typography variant="subtitle1">Tags for selected {itemType}:</Typography>
          <Box sx={{ mb: 2 }}>
            {selectedItem.tags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TextField
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag"
              size="small"
            />
            <Button onClick={handleAddTag} variant="contained" sx={{ ml: 1 }}>
              Add Tag
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default TagManager;