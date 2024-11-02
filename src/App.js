import React from 'react';
import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';
const App = () => {
  return (
    <div>
      <h1>Song Management</h1>
      <SongList />
    </div>
  );
};

export default App;
