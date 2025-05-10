import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: {},
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setError: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    clearError: (state, action) => {
      const { field } = action.payload;
      delete state.errors[field];
    },
    clearAllErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { setError, clearError, clearAllErrors } = validationSlice.actions;

export default validationSlice.reducer;
