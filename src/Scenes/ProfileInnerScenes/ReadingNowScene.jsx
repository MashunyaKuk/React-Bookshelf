import React from 'react';
import styled from 'styled-components';
import BookHolder from '../../Components/BookHolder';

const StyledReadingNowScene = styled.div`
  font-family: 'Montserrat';

`;

const ReadingNowScene = () => {
  return (
    <StyledReadingNowScene>
      <div className="reading-library-container">
        <BookHolder />
      </div>
    </StyledReadingNowScene>
  );
};

export default ReadingNowScene;
