import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    searchResults: [], // New state to store search results
    loading: false,
    error: null,
    currentPage: 1,
    editingSong: null, // Track the song being edited
    deletedSongs: [], // Track IDs of deleted songs
  },
  reducers: {
    // Action for starting to fetch songs
    fetchSongs: (state) => {
      state.loading = true;
      state.error = null; // Reset error state on new request
    },
    // Action for successfully fetching songs
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload.filter((song) => !state.deletedSongs.includes(song.id));
      state.error = null;
      state.deletedSongs = []; // Reset deletedSongs on fresh fetch
    },
    // Action for failed fetch
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Action for changing the current page
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
    // Action for deleting a song
    deleteSong: (state, action) => {
      state.deletedSongs.push(action.payload); // Add song ID to deletedSongs array
      state.songs = state.songs.filter(song => song.id !== action.payload); // Remove it from songs array
    },
    // Action for request to delete a song
    deleteSongRequest: (state) => {
      state.error = null; 
    },
    // Action for delete song failure
    deleteSongFailure: (state, action) => {
      state.error = action.payload; // Handle delete song error
    },
    // Action to handle searching for songs
    searchSongs: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searchResults = state.songs.filter(song =>
        song.title.toLowerCase().includes(query) // Assuming 'title' is the property to search
      );
    },
    // Reset search results
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

// Async action creator for fetching songs
export const fetchSongsAsync = (page) => async (dispatch) => {
  dispatch(fetchSongs()); // Start the fetch process
  try {
    const response = await fetch(`/api/songs?page=${page}`);
    const data = await response.json();
    dispatch(fetchSongsSuccess(data)); // Dispatch success action
    return data; // Return data for further chaining if needed
  } catch (error) {
    dispatch(fetchSongsFailure(error.message)); // Dispatch failure action
    throw error; // Throw error to catch in component if needed
  }
};

// Action creator for searching songs
export const searchSongsAsync = (query) => (dispatch) => {
  dispatch(searchSongs(query));
};

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
  deleteSong,
  searchSongs,
  resetSearchResults,
} = songsSlice.actions;

export default songsSlice.reducer;
