import React, { memo, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../HOC/GlobalModalProvider';

const StyledModalWindow = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
      
    .popup-body {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 50px;
      }
      
    .popup-content {
        background-color: #f6f5f3;
        color: #221c1d;
        width: 300px;
        padding: 20px 20px;
        border-radius: 4px;
        position: relative;
      }
      
    .popup-close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 18px;
        padding: 4px 10px 4px 10px;
        color: #F6F5F3;
        border-radius: 50%;
        border: none;
        background-color: #C89566;
        cursor: pointer;
        transition: 0.4s;

        :hover {
          transform: scale(1.2);
        }
      }
`;

const ModalWindow = (props) => {
  const setModalContent = useContext(ModalContext);
  const { children } = props;
  return (
    <StyledModalWindow className="modal">
      <div className="popup" id="popup-main">
        <div className="popup-body">
          <div className="popup-content">
            {children}
            <button
              type="button"
              className="popup-close"
              id="close-popup"
              onClick={() => {
                setModalContent(false);
              }}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </StyledModalWindow>
  );
};

export default memo(ModalWindow);
