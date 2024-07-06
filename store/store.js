import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import itemReducer from './itemSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemReducer,
  },
});
