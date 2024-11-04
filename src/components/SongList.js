// src/components/SongList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, setPage, deleteSongRequest } from '../redux/songsSlice';
import { Container, Title, SongItem, PaginationControls, Button, ErrorMessage, SongActions, Loader, Input } from './StyledComponents';
import AddSong from './AddSong';
import EditSong from './EditSong';

const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, deletedSongs } = useSelector((state) => state.songs);
  const [editingSongId, setEditingSongId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllSongs = async () => {
      await dispatch(fetchSongs(currentPage)); // You can remove the returned data if you don't need it
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
      dispatch(deleteSongRequest(songId));
    }
  };

  const handleUpdateComplete = () => {
    setEditingSongId(null);
  };

  // Filter songs based on the search term
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
    <Container>
      <Title>Song List</Title>
      <Input
        type="text"
        placeholder="Search by title, artist, or album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <Loader>Loading songs...</Loader>}
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
