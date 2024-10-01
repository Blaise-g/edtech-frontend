// src/store/slices/quizzesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock async function to fetch quizzes
// TODO: Replace with actual API call when backend is ready
export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchQuizzes',
  async () => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => resolve([
        {
          id: 1,
          title: 'React Basics',
          questions: [
            {
              id: 1,
              text: 'What is JSX?',
              type: 'multiple-choice',
              options: ['A database', 'A styling language', 'A syntax extension for JavaScript', 'A React component'],
              correctAnswer: 'A syntax extension for JavaScript',
              explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
            },
            // Add more questions...
          ],
          completed: false,
          tags: ['React', 'JavaScript']
        },
        // Add more quizzes...
      ]), 1000)
    );
  }
);

// Mock async function to submit quiz
// TODO: Replace with actual API call when backend is ready
export const submitQuiz = createAsyncThunk(
  'quizzes/submitQuiz',
  async ({ quizId, answers }) => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => {
        // Mock scoring logic
        const score = Math.floor(Math.random() * 101);
        resolve({ quizId, score, answers });
      }, 1000)
    );
  }
);

// Mock async function to update quiz
// TODO: Replace with actual API call when backend is ready
export const updateQuiz = createAsyncThunk(
  'quizzes/updateQuiz',
  async ({ id, tags }) => {
    // Simulate API call
    return new Promise((resolve) => 
      setTimeout(() => resolve({ id, tags }), 500)
    );
  }
);

    const quizzesSlice = createSlice({
      name: 'quizzes',
      initialState: {
        items: [],
        status: 'idle',
        error: null,
      },
      reducers: {
        addQuiz: (state, action) => {
          state.items.push({
            id: Date.now(),
            ...action.payload,
            completed: false,
            score: null,
          });
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        const { quizId, score, answers } = action.payload;
        const quiz = state.items.find(item => item.id === quizId);
        if (quiz) {
          quiz.completed = true;
          quiz.score = score;
          quiz.userAnswers = answers;
        }
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        const { id, tags } = action.payload;
        const quiz = state.items.find(item => item.id === id);
        if (quiz) {
          quiz.tags = tags;
        }
      });
  },
});

export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;