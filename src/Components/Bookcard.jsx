import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import bookCover from '../assets/img/bookcover.jpg';
import { PATHS } from '../Root/routes';
import { useHistory } from "react-router-dom";
import LazyImage from '../Components/LazyImage';
import { getCover } from '../api/libraryInstance';
import Button from '../Components/Button';
import { COLORS } from '../assets/styles/colors';

const StyledBookcard = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
width: 150px;
margin: 0 0 30px 30px;
  
@media (max-width: 992px) {
  margin: 0 0 15px 15px;
}
@media (max-width: 767px) {
  width: 100px;
  margin: 0 0 15px 0;
}
@media (max-width: 480px) {
  width: 80px;
  margin: 0 0 10px 0;
}

.bookcard {
  &-cover {
    margin-bottom: 5px;
    display: flex;
    border-radius: 4px;
    width: 120px;
    height: 199px;

    @media (max-width: 767px) {
      width: 90px;
      height: 140px;
    }
    @media (max-width: 480px) {
      width: 70px;
      height: 110px;
    }
  }

  &-cover_img {
    width: 120px;
    height: 199px;
    object-fit: cover;
    border-radius: 4px;

    @media (max-width: 767px) {
      width: 90px;
      height: 140px;
    }
    @media (max-width: 480px) {
      width: 70px;
      height: 110px;
    }
  }

  &-author {
    overflow: hidden;
    max-height: 80px;
  }

  &-name, &-author_p {
    font-size: 14px;
    margin: 0 0 5px 0;
    text-align: center;
    
    @media (max-width: 992px) {
      font-size: 12px;
    }
    @media (max-width: 767px) {
      font-size: 10px;
    }
  }
}
`;

const Bookcard = (props) => {
  const history = useHistory();
  const moveToBook = (id) => {
    history.push(PATHS.BOOK(id))
  }

  const [coverImage, setCoverImage] = useState();

  useEffect(() => {
    let mounted = true; //переменная, отвечающая за то, чтобы не обновлять состояние, если компонент еще не смонтирован
    getCover(props.cover())
      .then((data) => {
        if (mounted) {
          if (data.size < 808) {
            setCoverImage(bookCover);
          } else {
            setCoverImage(`https://covers.openlibrary.org/b/isbn/${props.cover()}-M.jpg`);
          }
        }
      })

      .catch(() => {
      }

      )
    return () => mounted = false;
  }, []);

  return (
    <StyledBookcard>
      <div className="bookcard-cover" >
        <LazyImage
          className={"bookcard-cover_img"}
          alt={"book-cover"}
          src={coverImage}
        />
      </div>
      <h4 className="bookcard-name">{props.title}</h4>
      <div className="bookcard-author">
        <p className="bookcard-author_p">
          {props.authors}
        </p>
      </div>
      <Button
        color={COLORS.ORANGE}
        onClick={() => {
          moveToBook(props.id);
        }}
      >
        Details
      </Button>
    </StyledBookcard >
  );
};

export default Bookcard;

