import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import bookCover from '../../assets/img/bookcover.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../Root/routes';
import { readBookRemove } from '../../store/actions/readBooksActions';
import { readBooks, readBooksRemove } from '../../api/readBooksInstance';

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 30px 30px;
  max-width: 650px;
  border: 1px solid #212121;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #c8956621;
}

  .bookcard-cover_img {
    width: 120px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
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

  .remove-book_btn  {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 20px;
    cursor: pointer;
    background-color: #925039;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
  }

  .bookcard-none_p {
    font-size: 18px;
    margin: 20px 0 0 20px;
  }
`;

const AlreadyReadScene = () => {
  const params = useParams();
  const urlParams = Number(params.userId);
  const [books, setBooks] = useState([]);
  const history = useHistory();

  //достаю данные из localstorage, но он очищается только после обновления страницы браузера!
  useEffect(() => {
    readBooks(urlParams)
      .then((currentUsersReadBooks) => {
        setBooks(currentUsersReadBooks);
      })
      .catch(() => {
      }

      )
  }, []);

  const dispatch = useDispatch();
  return (
    <StyledAlreadyReadScene>
      {books.length !== 0
        ?
        books.map((book) => {
          return (
            <React.Fragment key={book.bookId}>
              <div className="finished-library-container">
                <div className="bookcard-cover" >
                  <img src={`https://covers.openlibrary.org/b/isbn/${book.bookCover}-L.jpg`} alt="" className="bookcard-cover_img" />
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
                  <button
                    type="button"
                    className="remove-book_btn"
                    onClick={() => {
                      readBooksRemove(book.bookId)
                        .then(() => {
                          dispatch(readBookRemove(book.bookId));
                          history.push(PATHS.PROFILE_ABOUT(book.userId));
                        })
                    }}>
                    Remove book
                  </button>
                </div>
              </div>
            </React.Fragment>
          )
        }
        )
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
