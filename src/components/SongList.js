import React, { useState } from 'react';
import { SongItem, EditButton, DeleteButton } from './StyledComponents';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';



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
              <EditButton onClick={() => handleUpdate(song)}>Save</EditButton>
            </>
          ) : (
            <>
              {song.title}
              <EditButton onClick={() => setEditingSongId(song.id)}>Edit</EditButton>
              <DeleteButton onClick={() => dispatch({ type: 'songs/deleteSong', payload: song.id })}>
                Delete
              </DeleteButton>
            </>
          )}
        </SongItem>
      ))}
    </div>
  );
};

export default SongList;
