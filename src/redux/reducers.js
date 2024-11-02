import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songsSlice'; // Assuming you have a slice for songs

const rootReducer = combineReducers({
  songs: songsReducer, // Add your reducers here
});

export default rootReducer;
