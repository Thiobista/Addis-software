import styled from '@emotion/styled';
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};
// Other styled components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const SongItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
   margin-bottom: 10px;
   display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
  }
`;


// src/components/StyledComponents.js

// Remove the duplicate `Input` if found, or use the following structure:

export const Input = styled.input`
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 6px;
  }
`;

// Make sure there's only one definition of `Input`.


export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 200px;
align-items: center;
  gap: 10px;
  button {
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;

    &:hover {
      background-color: #0056b3;
    }
  }
`;


export const AddSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
   margin-bottom: 20px;
`;

export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;
  
  p {
    margin-bottom: 5px;
  }
`;


export const SongActions = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 8px;
`;
export const Loader = styled.div`
  margin: 20px 0;
  font-weight: bold;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const EditButton = styled(Button)`
  background-color: #28a745;
`;

export const DeleteButton = styled(Button)`
  background-color: #dc3545;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  background-color: #ffe6e6;
  padding: 10px;
  border: 1px solid #ffcccc;
  border-radius: 4px;
   margin-bottom: 10px;
   font-weight: bold;
`;

