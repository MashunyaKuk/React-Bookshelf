import React from 'react';
import styled from 'styled-components';

const StyledSuccessChangesModal = styled.div`
  width: 90%;

  .changes-text {
    font-size: 14px;
  }
`;

const SuccessChangesModal = () => {
  return (
    <StyledSuccessChangesModal>
      <p className="changes-text">Your changes have been successfully applied</p>
    </StyledSuccessChangesModal >
  );
};

export default SuccessChangesModal;
