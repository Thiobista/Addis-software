import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {
    setSongs: (state, action) => {
      state.list = action.payload;
    },
    addSong: (state, action) => {
      state.list.push(action.payload);
    },
    updateSong: (state, action) => {
      const index = state.list.findIndex(song => song.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteSong: (state, action) => {
      state.list = state.list.filter(song => song.id !== action.payload);
    },
  },
});

export const { setSongs, addSong, updateSong, deleteSong } = songsSlice.actions;
export default songsSlice.reducer;
