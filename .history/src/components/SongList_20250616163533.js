import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, setPage, deleteSong } from '../redux/songsSlice';
import EditSong from './EditSong';
import './SongList.css';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaSave, FaHeart, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const SongList = () => {
  const menuItems = [
    { name: 'Add Song', path: '/add-song' },
    { name: 'Favorites', path: '/favorites' },
   
  ];

  // Set oval parameters
  const ovalWidth = 400;
  const ovalHeight = 400;
  const numCircles = 7;
  const duration = 100;

  // Reference all circles
  const circles = document.querySelectorAll('.category-circle');

  // Move circles along the oval path
  function moveCircles() {
    circles.forEach((circle, index) => {
      const angleOffset = (index / numCircles) * 360;
      let startTime = performance.now();

      function animate() {
        const currentTime = performance.now();
        const elapsedTime = ((currentTime - startTime) / 1000) % duration;
        const angle = ((elapsedTime / duration) * 360 + angleOffset) % 360;
        const radians = (angle * Math.PI) / 180;

        const x = (ovalWidth / 2) * Math.cos(radians);
        const y = (ovalHeight / 2) * Math.sin(radians);

        circle.style.transform = `translate(${x + ovalWidth / 2 - 30}px, ${y + ovalHeight / 2 - 20}px)`;

        requestAnimationFrame(animate);
      }

      animate();
    });
  }

  moveCircles();

  const popularSingers = [
    'Adele',
    'Ed Sheeran',
    'Taylor Swift',
    'Beyoncé',
    'Bruno Mars',
    'Ariana Grande',
    'Justin Bieber',
    'Billie Eilish',
    'Drake',
    'The Weeknd',
  ];

  const dispatch = useDispatch();
  const { songs, loading, error, currentPage, deletedSongs } = useSelector((state) => state.songs);
  const [editingSongId, setEditingSongId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  
  const [timerStart, setTimerStart] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const timerIntervalRef = useRef(null);


  const [playingSongId, setPlayingSongId] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set()); // Set to store liked song IDs
  const [savedSongs, setSavedSongs] = useState(new Set()); 


  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPlaying, setIsPlaying] = useState(true); // To track play/pause state
  const [carouselInterval, setCarouselInterval] = useState(null);
  const carouselIntervalRef = useRef(null); // Ref to manage the interval

  const categories = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Classical', 'Jazz', 'Other'];

  useEffect(() => {
    const fetchAllSongs = async () => {
      await dispatch(fetchSongs(currentPage));
    };

    fetchAllSongs();
  }, [dispatch, currentPage]);


  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      dispatch(deleteSong(songId));
    }
  };

  const handleUpdateComplete = () => {
    setEditingSongId(null);
  };
  const handleLikeSong = (songId) => {
    setLikedSongs((prevLikedSongs) => {
      const updatedLikedSongs = new Set(prevLikedSongs);
      if (updatedLikedSongs.has(songId)) {
        updatedLikedSongs.delete(songId);
      } else {
        updatedLikedSongs.add(songId);
      }
      return updatedLikedSongs;
    });
  };

  const togglePlayPause = (songId) => {
    setPlayingSongId((prevId) => (prevId === songId ? null : songId));
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleSaveSong = (songId) => {
    setSavedSongs((prevLSavedSongs) => {
      const updatedSavedSongs = new Set(prevLSavedSongs);
      if (updatedSavedSongs.has(songId)) {
        updatedSavedSongs.delete(songId);
      } else {
        updatedSavedSongs.add(songId);
      }
      return updatedSavedSongs;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredSongs = songs
    .filter((song) => !deletedSongs.includes(song.id))
    .filter((song) => {
      const title = song.title ? song.title.toLowerCase() : '';
      const artist = song.artist ? song.artist.toLowerCase() : '';
      const album = song.album ? song.album.toLowerCase() : '';
      const search = searchTerm.toLowerCase();

      return (
        (selectedCategory === 'All' || song.category === selectedCategory) &&
        (title.includes(search) || artist.includes(search) || album.includes(search))
      );
    });


    
    useEffect(() => {
      if (isPlaying) {
        carouselIntervalRef.current = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % songs.slice(0, 5).length);
        }, 3000);
      } else {
        clearInterval(carouselIntervalRef.current);
      }
  
      return () => clearInterval(carouselIntervalRef.current);
    }, [isPlaying, songs]);
  
    const togglePlayPausec = () => {
      setIsPlaying((prev) => !prev);
    };
  
    const handleNextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % songs.slice(0, 5).length);
    };

    const handlePreviousSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + songs.slice(0, 5).length) % songs.slice(0, 5).length);
    };

    
  const renderCarousel = () => (
    <div className="carousel">
      <button className="carousel-arrow left-arrow" onClick={handlePreviousSlide}>
        ◀
      </button>
      <div className="carousel-container">
        {songs.slice(0, 5).map((song, index) => (
          <div
            key={song.id}
            className={`carousel-item ${index === currentSlide ? "active" : ""}`}
            style={{
              transform: `translateX(${-100 * currentSlide}%)`,
              transition: "transform 0.5s ease",
            }}
          >
            <img src="/default-music-image.jpg" alt="Song" />
            <p>{song.title}</p>
            <div className="carousel-buttons">
            {playingSongId === song.id ? (
                      <FaPause
                        className="icon"
                        onClick={() => togglePlayPausec(song.id)}
                      />
                    ) : (
                      <FaPlay
                        className="icon"
                        onClick={() => togglePlayPausec(song.id)}
                      />
                    )}
             <FaSave
                      className="icon"
                      onClick={() => handleSaveSong(song)}
                    />
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-arrow right-arrow" onClick={handleNextSlide}>
        ▶
      </button>
    </div>
  );

  
  return (
    <div className="song-list-wrapper">
      <header className="header">
        <div className="menu-container">
          <div className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            ☰
          </div>
        </div>
        <h1>Music Manager</h1>
        <div className="auth-buttons">
          <button className="login-button">Login</button>
        </div>
      </header>

      <div className={`menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <main className="main-content">
        {renderCarousel()}

        <div className="content-container">
          <div className="song-list-container">
            <div className="controls-container">
              <input
                type="text"
                placeholder="Search by title, artist, or album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="add-song-input search-bar"
              />
            </div>

            {loading && <div className="loader">Loading songs...</div>}
            {error && <div className="error-message">{error}</div>}

            <ul className="song-list">
              {filteredSongs.map((song) => (
                <React.Fragment key={song.id}>
                  {editingSongId === song.id && (
                    <li>
                      <EditSong song={song} onComplete={handleUpdateComplete} />
                    </li>
                  )}
                  <li className="song-item">
                    <div className="song-image">
                      <img
                        src="/default-music-image.jpg"
                        alt="Song"
                        className="song-thumbnail"
                      />
                    </div>
                    <div className="song-info">
                      <h3 className="song-title">{song.title}</h3>
                      <p className="song-artist">
                        <strong>Artist:</strong> {song.artist || "Unknown Artist"}
                      </p>
                      <p className="song-album">
                        <strong>Album:</strong> {song.album || "Unknown Album"}
                      </p>
                      <p className="song-category">
                        <strong>Category:</strong> {song.category || "Unknown"}
                      </p>
                      <div className="song-actions">
                      {playingSongId === song.id ? (
                      <FaPause
                        className="icon"
                        onClick={() => togglePlayPause(song.id)}
                      />
                    ) : (
                      <FaPlay
                        className="icon"
                        onClick={() => togglePlayPause(song.id)}
                      />
                    )}
                             <FaSave
                      className={`icon ${savedSongs.has(song.id) ? 'saved' : ''}`}
                      onClick={() => handleSaveSong(song.id)}
                    />
                    <FaHeart
                      className={`icon ${likedSongs.has(song.id) ? 'liked' : ''}`}
                      onClick={() => handleLikeSong(song.id)}
                    />
                    <FaEdit
                      className="icon"
                      onClick={() => handleEdit(song)}
                    />
                    <FaTrashAlt
                      className="icon"
                      onClick={() => handleDelete(song.id)}
                    />
                      </div>
                    </div>
                  </li>
                </React.Fragment>
              ))}
            </ul>

            <div className="pagination-controls">
              <button
                className="pagination-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagination-text">Page {currentPage}</span>
              <button className="pagination-button" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </div>

          <div className="container-two">
            <div className="popular-singers">
              <h2>Popular Singers</h2>
              <ul className="singer-list">
                {popularSingers.map((singer) => (
                  <li key={singer} className="singer-item">
                    {singer}
                  </li>
                ))}
              </ul>
            </div>
            <div className="category-selector">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`category-circle ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Music Manager. All rights reserved.</p>
          <p>
            <a href="/contact">Contact Us</a> | <a href="/about">About</a>
          </p>
          <p>Follow us on social media!</p>
        </div>
      </footer>
    </div>
  );
};

export default SongList;
