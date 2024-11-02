// src/components/AddSong.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSongRequest } from '../redux/songsSlice';
import { AddSongContainer, Button, Input, ErrorMessage } from './StyledComponents';

const AddSong = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !artist || !album) {
      setError('All fields are required.');
      return;
    }

    const newSong = {
      title,
      artist,
      album,
    };

    dispatch(createSongRequest(newSong));

    // Reset form and error state
    setTitle('');
    setArtist('');
    setAlbum('');
    setError(null);
  };

  return (
    <AddSongContainer>
      <h2>Add a New Song</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Song Title"
        />
        <Input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
        />
        <Input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Album"
        />
        <Button type="submit">Add Song</Button>
      </form>
    </AddSongContainer>
  );
};

export default AddSong;
