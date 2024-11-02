import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchSongsSuccess, fetchSongsFailure , createSongRequest,
  createSongSuccess,
  createSongFailure,updateSongRequest,
  updateSongSuccess,
  updateSongFailure,deleteSongRequest,fetchSongs,
  deleteSongFailure,} from './songsSlice';
  import axios from 'axios';
// Fetch posts from JSONPlaceholder API
function fetchPostsFromAPI(page) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

// Worker saga: fetch songs/posts
function* fetchSongsSaga(action) {
  try {
    const posts = yield call(fetchPostsFromAPI, action.payload);
    yield put(fetchSongsSuccess(posts));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}
// Create song saga
function* createSongSaga(action) {
  try {
    const response = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', action.payload);
    yield put(createSongSuccess(response.data));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}
// Update song saga
function* updateSongSaga(action) {
  try {
    const response = yield call(axios.put, `https://jsonplaceholder.typicode.com/posts/${action.payload.id}`, action.payload);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}
// API call to delete song
function* deleteSong(action) {
  try {
    yield call(axios.delete, `https://jsonplaceholder.typicode.com/posts/${action.payload}`);
    yield put(fetchSongs()); // Refetch songs after deleting
  } catch (error) {
    yield put(fetchSongsFailure('failed to delete message'));
  }
}

// Watcher saga: watch for fetchSongs action
export default function* songsSaga() {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga);
  yield takeLatest('songs/createSongRequest', createSongSaga);
  yield takeLatest('songs/updateSongRequest', updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}
