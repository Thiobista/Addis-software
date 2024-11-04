import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    loading: false,
    error: null,
    currentPage: 1,
    editingSong: null, // Track the song being edited
    deletedSongs: [], // Track IDs of deleted songs
  },
  reducers: {
     // Add this new reducer to handle immediate deletion in the UI
     deleteSong(state, action) {
      state.deletedSongs.push(action.payload); // Add song ID to deletedSongs array
      state.songs = state.songs.filter(song => song.id !== action.payload); // Remove it from songs array
    },
    fetchSongs: (state, action) => {
      state.loading = true;
      state.error = null; // Reset error state on new request
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload.filter((song) => !state.deletedSongs.includes(song.id));
      state.error = null;
      state.deletedSongs = []; // Reset deletedSongs on fresh fetch
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
      // Action for creating a song
      createSongRequest: (state) => {
        state.loading = true;
      },
      createSongSuccess: (state, action) => {
        state.loading = false;
        state.songs.push(action.payload);
      },
      createSongFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
        // Action for starting to edit a song
    startEditSong: (state, action) => {
      state.editingSong = action.payload;
    },
    // Action for updating a song
    updateSongRequest: (state) => {
      state.loading = true;
      state.error = null; 
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.songs.findIndex((song) => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = action.payload; // Replace the updated song
      }
      state.editingSong = null; // Reset after successful update
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest(state, action) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.error = null; 
      state.deletedSongs.push(action.payload);
    },
    deleteSongFailure(state, action) {
      state.error = action.payload; // Handle delete song error
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  setPage,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  startEditSong,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongFailure,
 deleteSong,}
 = songsSlice.actions;

export default songsSlice.reducer;
