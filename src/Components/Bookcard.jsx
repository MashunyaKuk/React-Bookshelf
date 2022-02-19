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
  
.bookcard-cover {
  margin-bottom: 5px;
  display: flex;
  border-radius: 4px;
  width: 120px;
  height: 199px;
}

  .bookcard-cover_img {
    width: 120px;
    height: 199px;
    object-fit: cover;
    border-radius: 4px;
  }

  .bookcard-author {
    overflow: hidden;
    max-height: 80px;
  }

  .bookcard-name, .bookcard-author_p {
    font-size: 14px;
    margin: 0 0 5px 0;
    text-align: center;
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

