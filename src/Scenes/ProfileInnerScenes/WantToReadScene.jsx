import React from 'react';
import styled from 'styled-components';
import BookHolder from '../../Components/BookHolder';

const StyledWantToReadScene = styled.div`
  font-family: 'Montserrat';

`;

const WantToReadScene = () => {
  return (
    <StyledWantToReadScene>
      <div className="want-library-container">
        <BookHolder />
      </div>
    </StyledWantToReadScene>
  );
};

export default WantToReadScene;
