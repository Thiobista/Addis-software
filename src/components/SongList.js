// src/components/SongList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, setPage, startEditSong } from '../redux/songsSlice';
import { fetchSongsRequest, deleteSongRequest } from '../redux/songsSlice';
import { Container, Title, SongItem, PaginationControls, Button, ErrorMessage, SongActions, Loader, Input } from './StyledComponents';
import AddSong from './AddSong';
import EditSong from './EditSong'; // Import the EditSong component

const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, editingSong } = useSelector((state) => state.songs);
  const [editingSongId, setEditingSongId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchSongs(currentPage));
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
    setEditingSongId(song.id); // Set the editing song ID
  };

  const handleDelete = (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongRequest(songId));
    }
  };

  const handleUpdateComplete = () => {
    setEditingSongId(null); // Reset editing song ID to hide the edit form
  };

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>Song List</Title>
      <Input
        type="text"
        placeholder="Search by title, artist, or album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading.fetch && <Loader>Loading songs...</Loader>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AddSong />

      {editingSongId && (
        <EditSong 
          song={songs.find((song) => song.id === editingSongId)} 
          onComplete={handleUpdateComplete} 
        />
      )}

      {filteredSongs.map((song) => (
        <SongItem key={song.id}>
          <div>Title: {song.title}</div>
          <div>Artist: {song.artist || 'Unknown Artist'}</div>
          <div>Album: {song.album || 'Unknown Album'}</div>
          <SongActions>
            <Button onClick={() => handleEdit(song)}>Edit</Button>
            <Button onClick={() => handleDelete(song.id)}>Delete</Button>
          </SongActions>
        </SongItem>
      ))}
      <PaginationControls>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button onClick={handleNextPage}>Next</Button>
      </PaginationControls>
    </Container>
  );
};

export default SongList;
