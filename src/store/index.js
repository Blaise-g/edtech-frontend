// src/store/index.js
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import flashcardsReducer from './slices/flashcardsSlice';
import quizzesReducer from './slices/quizzesSlice';
import chatbotReducer from './slices/chatbotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    flashcards: flashcardsReducer,
    quizzes: quizzesReducer,
    chatbot: chatbotReducer,
    // Add other reducers
  },
});

