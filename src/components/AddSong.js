import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, AddButton } from './StyledComponents'; 

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
     <AddButton type="submit">Add Song</AddButton>
    </form>
  );
};

export default AddSong;
