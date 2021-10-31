import React from 'react';
import styled from 'styled-components';
import BookHolder from '../Components/BookHolder';
import BookFilters from '../Components/Filters';

const StyledLibraryScene = styled.div`
  font-family: 'Montserrat';
  margin: 0 15px;
  
  .library-holder {
    margin: auto;
    display: flex;
    align-items: flex-start;
    max-width: 1170px;
  }

  .sidebar-container {
    margin-right: 20px;
  }

  .library-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LibraryScene = () => {
  return (
    <StyledLibraryScene>
      <div className="library-holder">
        <div className="sidebar-container">
          <BookFilters />
        </div>
        <div className="library-container">
          <BookHolder />
        </div>
      </div>
    </StyledLibraryScene>
  );
};

export default LibraryScene;
