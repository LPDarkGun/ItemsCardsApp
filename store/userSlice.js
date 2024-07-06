import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    removeUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload.id);
    },
    editUser: (state, action) => {
      const { id, newUser } = action.payload;
      const index = state.list.findIndex(user => user.id === id);
      if (index !== -1) {
        state.list[index] = newUser;
      }
    },
    clearUsers: (state) => {
      state.list = [];
    },
  },
});

export const { addUser, removeUser, editUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;
