import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { setSongs, addSong, updateSong, deleteSong } from './songsSlice';

function* fetchSongs() {
  try {
    const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts'); // Mock API for testing
    yield put(setSongs(response.data));
  } catch (error) {
    console.error('Fetch error', error);
  }
}

function* addNewSong(action) {
  try {
    const response = yield call(axios.post, '/api/songs', action.payload);
    yield put(addSong(response.data));
  } catch (error) {
    console.error('Add error', error);
  }
}

// You can add updateSong and deleteSong functions in a similar way.

function* saga() {
  yield takeEvery('songs/fetchSongs', fetchSongs);
  yield takeEvery('songs/addSong', addNewSong);
  // Similarly, handle update and delete.
}

export default saga;
