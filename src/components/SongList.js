// src/components/SongList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, setPage, startEditSong } from '../redux/songsSlice';
import { fetchSongsRequest, deleteSongRequest } from '../redux/songsSlice';
import { Container, Title, SongItem, PaginationControls, Button, ErrorMessage, SongActions,Loader,Input } from './StyledComponents';
import AddSong from './AddSong';
import EditSong from './EditSong'; // Import the EditSong component

const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, editingSong } = useSelector((state) => state.songs);
  const [editingSongId, setEditingSongId] = useState(null);

  // State for search term
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
    dispatch(startEditSong(song)); // Set the song to be edited
  };
  const handleDelete = (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongRequest(songId));
    }
  };
 // Filter songs based on the search term
 const filteredSongs = songs.filter((song) =>
  song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
  song.album.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <Container>
      <Title>Song List</Title>
        {/* Search Input */}
        <Input
        type="text"
        placeholder="Search by title, artist, or album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading.fetch && <Loader>Loading songs...</Loader>} {/* Show loading indicator during fetch */}

      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message */}
      {/* Display the AddSong form */}
      <AddSong />

      {/* Display the EditSong form if a song is being edited */}
      {editingSong && <EditSong song={editingSong} />}

      {loading && <div>Loading...</div>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {songs.map((song) => (
        <SongItem key={song.id}>
          <div>Title: {song.title}</div>
          <div>Artist: {song.artist || 'Unknown Artist'}</div>
          <div>Album: {song.album || 'Unknown Album'}</div>
          <SongActions>
              <Button onClick={() => setEditingSongId(song.id)}>Edit</Button>
              <Button onClick={() => handleDelete(song.id)}>Delete
              {loading.delete ? 'Deleting...' : 'Delete'}
              </Button>
            </SongActions>
            {editingSongId === song.id && <EditSong song={song} />}
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
