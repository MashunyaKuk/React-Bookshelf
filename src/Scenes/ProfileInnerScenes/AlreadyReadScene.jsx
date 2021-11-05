import React from 'react';
import styled from 'styled-components';
import BookHolder from '../../Components/BookHolder';

const StyledAlreadyReadScene = styled.div`
  font-family: 'Montserrat';

`;

const AlreadyReadScene = () => {
  return (
    <StyledAlreadyReadScene>
      <div className="finished-library-container">
        <BookHolder />
      </div>
    </StyledAlreadyReadScene>
  );
};

export default AlreadyReadScene;
