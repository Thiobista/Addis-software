// src/components/SongList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, setPage, deleteSong } from '../redux/songsSlice';
import AddSong from './AddSong';
import EditSong from './EditSong';
import './SongList.css';

const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, deletedSongs } = useSelector((state) => state.songs);
  const [editingSongId, setEditingSongId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllSongs = async () => {
      await dispatch(fetchSongs(currentPage));
    };

    fetchAllSongs();
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    dispatch(setPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleEdit = (song) => {
    setEditingSongId(song.id);
  };

  const handleDelete = (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSong(songId));
    }
  };

  const handleUpdateComplete = () => {
    setEditingSongId(null);
  };

  const filteredSongs = songs
    .filter((song) => !deletedSongs.includes(song.id))
    .filter((song) => {
      const title = song.title ? song.title.toLowerCase() : "";
      const artist = song.artist ? song.artist.toLowerCase() : "";
      const album = song.album ? song.album.toLowerCase() : "";
      const search = searchTerm.toLowerCase();

      return (
        title.includes(search) ||
        artist.includes(search) ||
        album.includes(search)
      );
    });

  return (
    <div className="song-list-container">
      <h1>Song List</h1>
      <input
        type="text"
        placeholder="Search by title, artist, or album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="add-song-input"
      />
      {loading && <div className="loader">Loading songs...</div>}
      {error && <div className="error-message">{error}</div>}
      <AddSong />

      <ul className="song-list">
        {filteredSongs.map((song) => (
          <React.Fragment key={song.id}>
            {editingSongId === song.id && (
              <li>
                <EditSong 
                  song={song} 
                  onComplete={handleUpdateComplete} 
                />
              </li>
            )}
            <li className="song-item">
              <div className="song-title">Title: {song.title}</div>
              <div>Artist: {song.artist || 'Unknown Artist'}</div>
              <div>Album: {song.album || 'Unknown Album'}</div>
              <div className="song-actions">
                <button className="edit-button" onClick={() => handleEdit(song)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(song.id)}>Delete</button>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
      
      <div className="pagination-controls">
        <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button className="pagination-button" onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default SongList;
