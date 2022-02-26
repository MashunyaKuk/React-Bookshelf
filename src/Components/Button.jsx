import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/styles/colors';

const StyledButton = styled.button`
  color: ${COLORS.WHITE};
  font-family: 'Montserrat';
  padding: 10px 30px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  
  @media (max-width: 992px) {
    padding: 9px 25px;
    font-size: 13px;
  }
  @media (max-width: 767px) {
    padding: 8px 13px;
    font-size: 11px;
  }
`

const Button = (props) => {
  return (
    <StyledButton onClick={props.onClick} type={props.type} color={props.color}>
      {props.children}
    </StyledButton>
  )
}

export default Button;