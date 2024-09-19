import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

const SongItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const SongList = ({ songs }) => {
  const dispatch = useDispatch();
  const [editingSongId, setEditingSongId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleUpdate = (song) => {
    dispatch({ type: 'songs/updateSong', payload: { id: song.id, title: newTitle } });
    setEditingSongId(null);
  };
  const handleDelete = (songId) => {
    dispatch({ type: 'songs/deleteSong', payload: songId });
  };
  return (
    <div>
      {songs.map((song) => (
        <SongItem key={song.id}>
          {editingSongId === song.id ? (
            <>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => handleUpdate(song)}>Save</button>
            </>
          ) : (
            <>
              {song.title}
              <button onClick={() => setEditingSongId(song.id)}>Edit</button>
              <button onClick={() => handleDelete(song.id)}>Delete</button>
            </>
          )}
        </SongItem>
      ))}
    </div>
  );
};

export default SongList;
