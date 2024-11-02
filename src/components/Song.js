import React from 'react';
import { SongItem, Button, Input } from './StyledComponents';

const Song = ({ song, editingSongId, setEditingSongId, newTitle, setNewTitle, handleUpdate, handleDelete }) => {
  return (
    <SongItem key={song.id}>
      {editingSongId === song.id ? (
        <>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button onClick={() => handleUpdate(song)}>Save</Button>
        </>
      ) : (
        <>
          {song.title}
          <Button onClick={() => {
            setEditingSongId(song.id);
            setNewTitle(song.title);
          }}>Edit</Button>
          <Button onClick={() => handleDelete(song.id)}>Delete</Button>
        </>
      )}
    </SongItem>
  );
};

export default Song;
