// src/store/slices/flashcardsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock async functions (replace with actual API calls when connecting to backend)
export const fetchFlashcards = createAsyncThunk(
  'flashcards/fetchFlashcards',
  async () => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => resolve([
        { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces', mastery: 0.7, nextReview: new Date(), tags: ['React', 'JavaScript'] },
        { id: 2, question: 'What is Redux?', answer: 'A predictable state container for JavaScript apps', mastery: 0.5, nextReview: new Date(Date.now() + 86400000), tags: ['Redux', 'JavaScript'] },
      ]), 1000)
    );
  }
);

export const updateFlashcard = createAsyncThunk(
  'flashcards/updateFlashcard',
  async ({ id, difficulty, tags }) => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => resolve({ id, difficulty, tags }), 500)
    );
  }
);

export const shareFlashcard = createAsyncThunk(
  'flashcards/shareFlashcard',
  async (id) => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => resolve({ id, sharedUrl: `https://yourapp.com/shared-flashcard/${id}` }), 500)
    );
  }
);

export const setDailyGoal = createAsyncThunk(
  'flashcards/setDailyGoal',
  async (goal) => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => resolve({ goal }), 500)
    );
  }
);

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    dailyGoal: 10,
    reviewedToday: 0,
  },
  reducers: {
    addFlashcard: (state, action) => {
      state.items.push(action.payload);
    },
    incrementReviewedToday: (state) => {
      state.reviewedToday += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashcards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFlashcards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFlashcard.fulfilled, (state, action) => {
        const { id, difficulty, tags } = action.payload;
        const flashcard = state.items.find(item => item.id === id);
        if (flashcard) {
          flashcard.mastery = Math.min(flashcard.mastery + 0.1, 1);
          flashcard.nextReview = new Date(Date.now() + 86400000);
          flashcard.tags = tags;
        }
      })
      .addCase(shareFlashcard.fulfilled, (state, action) => {
        const { id, sharedUrl } = action.payload;
        const flashcard = state.items.find(item => item.id === id);
        if (flashcard) {
          flashcard.sharedUrl = sharedUrl;
        }
      })
      .addCase(setDailyGoal.fulfilled, (state, action) => {
        state.dailyGoal = action.payload.goal;
      });
  },
});

export const { addFlashcard, incrementReviewedToday } = flashcardsSlice.actions;
export default flashcardsSlice.reducer;