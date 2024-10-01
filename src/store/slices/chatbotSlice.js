import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendMessage = createAsyncThunk(
  'chatbot/sendMessage',
  async (message, thunkAPI) => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to get a response from AI assistant');
    }
  }
);

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ from: 'user', text: action.payload, timestamp: Date.now() });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ from: 'assistant', text: action.payload, timestamp: Date.now() });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUserMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
