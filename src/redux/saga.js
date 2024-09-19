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
    const response = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', {
      title: action.payload.title,
    });
    yield put(addSong(response.data));
  } catch (error) {
    console.error('Error adding song:', error);
  }
}
function* deleteSongById(action) {
  try {
    yield call(axios.delete, `https://jsonplaceholder.typicode.com/posts/${action.payload}`);
    yield put(deleteSong(action.payload));
  } catch (error) {
    console.error('Error deleting song:', error);
  }
}


// You can add updateSong and deleteSong functions in a similar way.

function* saga() {
  yield takeEvery('songs/fetchSongs', fetchSongs);
  yield takeEvery('songs/addSong', addNewSong);
  // Similarly, handle update and delete.
}
function* updateExistingSong(action) {
  try {
    const { id, title } = action.payload;
    const response = yield call(axios.put, `https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
    });
    yield put(updateSong(response.data));
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

export default saga;
