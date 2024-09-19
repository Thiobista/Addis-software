import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddSong = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      dispatch({ type: 'songs/addSong', payload: { title } });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter song title"
      />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default AddSong;
