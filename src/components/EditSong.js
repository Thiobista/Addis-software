import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSongRequest } from '../redux/songsSlice';
import './EditSong.css'; // Add this for modal-specific styles

const EditSong = ({ song, onComplete }) => {
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
    if (onComplete) {
      onComplete(); // Close the modal
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Song</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song Title"
            className="input-field"
          />
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            className="input-field"
          />
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album"
            className="input-field"
          />
          <div className="modal-actions">
            <button type="submit" className="primary-button">Update Song</button>
            <button type="button" onClick={onComplete} className="secondary-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSong;
