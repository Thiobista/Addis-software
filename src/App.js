import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';
import AddSong from './pages/AddSong';
import Favorites from './pages/Favorites';
import MySongs from './pages/MySongs';


const App = () => {
  return (
    <Router>
      <div>
        {/* Uncomment the title if needed */}
        {/* <h1>Song Management</h1> */}
        <Routes>
          {/* Route for the SongList page */}
          <Route path="/" element={<SongList />} />

          {/* Route for adding a song */}
          <Route path="/add-song" element={<AddSong />} />

          {/* Route for the AddSongForm (optional, if separate functionality is needed) */}
          {/* Remove or use a different path if AddSong includes AddSongForm */}
          {/* <Route path="/add-song-form" element={<AddSongForm />} /> */}

          {/* Routes for Favorites and My Songs */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-songs" element={<MySongs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
