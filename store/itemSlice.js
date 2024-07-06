import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('/api/items');
  return response.data;
});

export const addItemToDB = createAsyncThunk('items/addItemToDB', async (item) => {
  const response = await axios.post('/api/items', item);
  return response.data;
});

export const updateItemInDB = createAsyncThunk('items/updateItemInDB', async ({ id, newItem }) => {
  const response = await axios.put('/api/items', { id, newItem });
  return { id, newItem: response.data };
});

export const removeItemFromDB = createAsyncThunk('items/removeItemFromDB', async (id) => {
  await axios.delete(`/api/items?_id=${id}`);
  return id;
});

export const clearItemsFromDB = createAsyncThunk('items/clearItemsFromDB', async () => {
  await axios.delete('/api/items');
  return [];
});

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
    status: null,
  },
  reducers: {
    addItem: (state, action) => {
      if (!state.list.some(item => item._id === action.payload._id)) {
        state.list.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },
    clearItems: (state) => {
      state.list = [];
    },
    editItem: (state, action) => {
      const { id, newItem } = action.payload;
      const index = state.list.findIndex((item) => item._id === id);
      if (index !== -1) {
        state.list[index] = newItem;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addItemToDB.fulfilled, (state, action) => {
        if (!state.list.some(item => item._id === action.payload._id)) {
          state.list.push(action.payload);
        }
      })
      .addCase(updateItemInDB.fulfilled, (state, action) => {
        const { id, newItem } = action.payload;
        const index = state.list.findIndex((item) => item._id === id);
        if (index !== -1) {
          state.list[index] = newItem;
        }
      })
      .addCase(removeItemFromDB.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      })
      .addCase(clearItemsFromDB.fulfilled, (state) => {
        state.list = [];
      });
  },
});

export const { addItem, removeItem, clearItems, editItem } = itemSlice.actions;

export default itemSlice.reducer;
