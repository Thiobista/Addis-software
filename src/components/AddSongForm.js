import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddSongForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && artist) {
      dispatch({
        type: 'songs/addSong',
        payload: { title, artist },
      });
      setTitle('');
      setArtist('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
        required
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
        required
      />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default AddSongForm;
