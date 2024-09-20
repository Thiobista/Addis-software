import React, { useEffect } from 'react';
import { Container } from './components/StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from './redux/songsSlice';
import SongList from './components/SongList';
import AddSong from './components/AddSong';

const App = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list);

  useEffect(() => {
    dispatch({ type: 'songs/fetchSongs' });
  }, [dispatch]);

  return (
    <Container>
      <h1>Song List</h1>
      <AddSong />
      <SongList songs={songs} />
    </Container>
  );
};

export default App;
