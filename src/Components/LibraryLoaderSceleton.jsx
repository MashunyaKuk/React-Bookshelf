import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const StyledMyLoader = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: stretch;
flex-wrap: wrap;

.bookcard-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 30px 30px;
  width: 150px;

  @media (max-width: 767px) {
    margin: 0 0 7px 7px;
    width: 100px;
  }
  @media (max-width: 480px) {
    margin: 0 0 4px 4px;
}
} 

.bookcard-cover, .bookcard-name, .bookcard-author {
  margin-bottom: 10px;
}
`

const MyLoader = () => {
  const bookArray = Array(15).fill('');
  return (
    <StyledMyLoader>
      {bookArray.map((book, index) => {
        return (
          <SkeletonTheme key={index} color="#c9c9c9" highlightColor="#c4c3c3">
            <div className="bookcard-card">
              <div className="bookcard-cover" >
                <Skeleton height={window.innerWidth > 767 ? 180 : 140} width={window.innerWidth > 767 ? 100 : 95} />
              </div>
              <div className="bookcard-name">
                <Skeleton height={window.innerWidth > 767 ? 20 : 15} width={window.innerWidth > 767 ? 100 : 60} />
              </div>
              <div className="bookcard-author">
                <Skeleton height={window.innerWidth > 767 ? 20 : 15} width={window.innerWidth > 767 ? 120 : 80} />
              </div>
              <div className="want-read_btn">
                <Skeleton height={window.innerWidth > 767 ? 20 : 15} width={window.innerWidth > 767 ? 60 : 30} />
              </div>
              <div>
              </div>
            </div>
          </SkeletonTheme>
        )
      })}

    </StyledMyLoader>

  )
}
export default MyLoader;
