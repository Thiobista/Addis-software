// src/components/StyledComponents.js
import styled from '@emotion/styled';
import { space, color, typography, layout, flexbox } from 'styled-system';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
    @media (max-width: 600px) {
    max-width: 100%;
    padding: 10px;
  }
  ${space}
  ${layout}
`;
// Song item styling
export const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  ${space}
  ${color}
  ${layout}
`;

// Button styling
export const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
   border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #007bff;
  }
  ${typography}
  ${space}
`;

export const DeleteButton = styled(EditButton)`
  background-color: #dc3545;
   &:hover {
    background-color: #c82333;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #dc3545;
  }
`;
// Form styling
export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${space}
  ${layout}
`;

// Input styling
export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  margin-right: 10px;
  ${typography}
  ${space}
`;

// Add song button styling
export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  ${typography}
  ${space}
`;
export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  ${typography}
  ${color}
`;

export const SongTitle = styled.span`
  font-size: 1.2rem;
  ${typography}
  ${color}
`;
