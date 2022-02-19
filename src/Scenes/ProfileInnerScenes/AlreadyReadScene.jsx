import React, { useEffect } from 'react';
import styled from 'styled-components';
import bookCover from '../../assets/img/bookcover.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readBookAdd, readBookRemove } from '../../store/actions/readBooksActions';
import { readBooks, readBooksRemove } from '../../api/readBooksInstance';
import { readBooksSelector } from '../../store/selectors/readBooksSelector';
import LazyImage from '../../Components/LazyImage';
import Button from '../../Components/Button';
import { COLORS } from '../../assets/styles/colors';

const StyledAlreadyReadScene = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: center;
flex-wrap: wrap;
  
.bookcard-cover {
  margin-bottom: 5px;
  background-image: url(${bookCover});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  border-radius: 4px;
  margin-right: 20px;
}

.finished-library-container {
  @media (max-width: 1200px) {
    max-width: 550px;
  }
  @media (max-width: 992px) {
    max-width: 450px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  max-width: 650px;
  border: 1px solid ${COLORS.BLACK};
  border-radius: 4px;
  padding: 10px 20px;
  background-color: ${COLORS.DARK_ORANGE};
}

  .bookcard-cover_img {
    width: 120px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    display: flex;
  }

  .bookcard-author {
    overflow: hidden;
    max-height: 80px;
  }

  .bookcard-text {
    width: 300px;
    margin-right: 20px;
  }

  .bookcard-name, .bookcard-author_p {
    font-size: 16px;
    margin: 0 0 15px 0;
    text-align: center;
  }

  .bookcard-pages {
    font-size: 14px;
    text-align: center;
  }

  .bookcard-btn-group {
    display: flex;
    flex-direction: column;
  }

  .bookcard-none_p {
    font-size: 18px;
    margin: 20px 0 0 20px;
  }
`;

const AlreadyReadScene = () => {
  const params = useParams();
  const urlParams = Number(params.userId);
  const dispatch = useDispatch();

  const readBooksList = useSelector(readBooksSelector);

  useEffect(() => {
    let mounted = true; //переменная, отвечающая за то, чтобы не обновлять состояние, если компонент еще не смонтирован
    readBooks(urlParams)
      .then((currentUsersReadBooks) => {
        if (mounted) {
          if (readBooksList.length !== currentUsersReadBooks.length) {
            currentUsersReadBooks.map((book) => {
              dispatch(readBookAdd(book.bookId, book.bookTitle, book.bookAuthors, book.bookCover, book.bookFirstYear, book.userId))
            })
          }
        }
      })
      .catch(() => {

      })
    return () => mounted = false;
  }, [])

  return (
    <StyledAlreadyReadScene>
      {readBooksList.length !== 0
        ?
        readBooksList.map((book) => {
          return (
            <React.Fragment key={book.bookId}>
              <div className="finished-library-container">
                <div className="bookcard-cover" >
                  <LazyImage src={`https://covers.openlibrary.org/b/isbn/${book.bookCover}-L.jpg`} alt="" className="bookcard-cover_img" />
                </div>
                <div className="bookcard-text">
                  <h4 className="bookcard-name">{book.bookTitle}</h4>
                  <div className="bookcard-author">
                    <p className="bookcard-author_p">
                      {book.bookAuthors}
                    </p>
                  </div>
                  <div className="bookcard-pages">
                    <p className="bookcard-pages">
                      First published year - {book.bookFirstYear}
                    </p>
                  </div>
                </div>
                <div className="bookcard-btn-group">
                  <Button
                    type="button"
                    color={COLORS.RED}
                    onClick={() => {
                      readBooksRemove(book.bookId)
                        .then(() => {
                          dispatch(readBookRemove(book.bookId));
                        })
                    }}>
                    Remove book
                  </Button>
                </div>
              </div>
            </React.Fragment>
          )
        })
        :
        <div className="bookcard-none">
          <p className="bookcard-none_p">
            HERE will be your already read book list
          </p>
        </div>}
    </StyledAlreadyReadScene>
  );
};

export default AlreadyReadScene;
