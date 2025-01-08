import React from 'react';
import './Favorites.css';

const Favorites = () => (
  <div className="favorites-container">
    <h1>Your Favorite Songs</h1>
    <div className="song-list">
      {/* Replace with dynamic song data */}
      <div className="song-item">
        <div className="song-title">Song 1</div>
        <button className="play-button">▶ Play</button>
      </div>
      <div className="song-item">
        <div className="song-title">Song 2</div>
        <button className="play-button">▶ Play</button>
      </div>
      <div className="song-item">
        <div className="song-title">Song 3</div>
        <button className="play-button">▶ Play</button>
      </div>
    </div>
  </div>
);

export default Favorites;
