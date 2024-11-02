const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique IDs

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let songs = [];

// GET all songs
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

// POST new song
app.post('/api/songs', (req, res) => {
  const newSong = { id: uuidv4(), title: req.body.title }; // Generate a unique ID for each song
  songs.push(newSong);
  res.json(newSong);
});

// PUT (update) song
app.put('/api/songs/:id', (req, res) => {
  const songId = req.params.id;
  const song = songs.find(s => s.id === songId);
  if (song) {
    song.title = req.body.title;
    res.json(song);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

// DELETE song
app.delete('/api/songs/:id', (req, res) => {
  const songId = req.params.id;
  songs = songs.filter(s => s.id !== songId);
  res.json({ message: 'Song deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
