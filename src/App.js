import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from './redux/songsSlice';
import SongList from './components/SongList';

const App = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs.list);

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  return (
    <div>
      <h1>Song List</h1>
      <SongList songs={songs} />
    </div>
  );
};

export default App;
