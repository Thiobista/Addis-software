// src/components/EditSong.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSongRequest } from '../redux/songsSlice';
import { AddSongContainer, Button, Input, ErrorMessage } from './StyledComponents';

const EditSong = ({ song }) => {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !artist || !album) {
      setError('All fields are required.');
      return;
    }

    const updatedSong = {
      id: song.id,
      title,
      artist,
      album,
    };

    dispatch(updateSongRequest(updatedSong));

    setError(null);
  };

  return (
    <AddSongContainer>
      <h2>Edit Song</h2>
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
        <Button type="submit">Update Song</Button>
      </form>
    </AddSongContainer>
  );
};

export default EditSong;
