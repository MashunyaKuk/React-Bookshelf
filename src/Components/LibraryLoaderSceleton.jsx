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
  width: 150px;
  margin: 0 0 30px 30px;
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
                <Skeleton height={200} width={120} />
              </div>
              <div className="bookcard-name">
                <Skeleton height={20} width={100} />
              </div>
              <div className="bookcard-author">
                <Skeleton height={20} width={120} />
              </div>
              <div className="want-read_btn">
                <Skeleton height={20} width={60} />
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
