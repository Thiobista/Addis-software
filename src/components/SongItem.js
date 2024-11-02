// src/components/SongList.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong } from '../redux/songsSlice'; // Adjust path if needed
import { Container, SongItem, Button, Input } from './StyledComponents';

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [newSongAlbum, setNewSongAlbum] = useState('');

  useEffect(() => {
    // Fetch songs from API when the component mounts
    // Implement the fetching logic...
  }, []);

  const handleAddSong = (e) => {
    e.preventDefault();
    if (newSongTitle.trim() === '' || newSongArtist.trim() === '' || newSongAlbum.trim() === '') {
      // Validation: Ensure no fields are empty
      alert('All fields are required.');
      return;
    }
    // Dispatch action to add song
    dispatch(addSong({ title: newSongTitle, artist: newSongArtist, album: newSongAlbum }));
    
    // Reset form fields
    setNewSongTitle('');
    setNewSongArtist('');
    setNewSongAlbum('');
  };

  return (
    <Container>
      <form onSubmit={handleAddSong}>
        <Input
          type="text"
          placeholder="Song Title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Artist"
          value={newSongArtist}
          onChange={(e) => setNewSongArtist(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Album"
          value={newSongAlbum}
          onChange={(e) => setNewSongAlbum(e.target.value)}
          required
        />
        <Button type="submit">Add Song</Button>
      </form>

      {songs.map((song) => (
        <SongItem key={song.id}>
          {song.title} by {song.artist} (Album: {song.album})
        </SongItem>
      ))}
    </Container>
  );
};

export default SongList;
