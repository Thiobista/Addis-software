import React from 'react';
import styled from '@emotion/styled';

const SongItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
`;

const SongList = ({ songs }) => (
  <div>
    {songs.map(song => (
      <SongItem key={song.id}>{song.title}</SongItem>
    ))}
  </div>
);

export default SongList;
