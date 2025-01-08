import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../redux/songsSlice';
import './AddSong.css';

const AddSong = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!title.trim() || !artist.trim()) {
        alert('Please provide both a song title and artist.');
        return;
      }
      
      setLoading(true);
  
      const newSong = {
        title,
        artist,
        album: album.trim() || 'Unknown Album',
        imageUrl: imageUrl.trim() || '/default-music-image.jpg',
      };
      
      dispatch(addSong(newSong));
      
      setTitle('');
      setArtist('');
      setAlbum('');
      setImageUrl('');
      setLoading(false);
    };
  
    return (
      <div className="add-song-container">
        <h1 className="add-song-title">🎶 Add a New Song 🎶</h1>
        <form onSubmit={handleSubmit} className="add-song-form">
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-song-input"
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="add-song-input"
          />
          <input
            type="text"
            placeholder="Album (optional)"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="add-song-input"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="add-song-input"
          />
          <button type="submit" className="add-song-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Song'}
          </button>
        </form>
      </div>
    );
  };
  

export default AddSong;
