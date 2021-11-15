import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components';
import bookCover from '../assets/img/bookcover.jpg';
import { Link } from 'react-router-dom';
import { ROUTE } from '../Root/routes';
import { getBooks } from '../api/libraryInstance';
import { Formik, Field, Form } from 'formik';
import FormikCheckboxes from '../Components/FormikInputs/FormikCheckboxes';

const StyledLibraryScene = styled.div`
font-family: 'Montserrat';
margin: auto;
display: flex;
align-items: flex-start;
max-width: 1170px;

  .sidebar-container {
    width: 200px;
    margin-right: 20px;
  }

  .book-filter_form {
    margin-bottom: 30px;
  }

  .book-filters_holder {
    border: 1px solid #212020;
    border-radius: 4px;
    padding: 15px 30px 15px 30px;
}

  .book-filter {
    margin-bottom: 15px;
    &_p {
      margin-bottom: 5px;
      color: #6E7064;
    }
  }

  .book-filter_btn {
    color: #F6F5F3;
      font-family: 'Montserrat';
      padding: 10px 30px;
      cursor: pointer;
      background-color: #6E7064;
      border: none;
      border-radius: 4px;
      font-size: 14px;
  }

  .book-search {
    margin-bottom: 10px;
  }

    .book-searchfield {
    border: none;
    background-color: #e7e7e7;
    border-radius: 4px;
    height: 30px;
    padding: 5px;
    width: 100%;
    

    :focus-visible {
      outline: none;
    }
  }

  .book-search_btn {
    color: #F6F5F3;
      font-family: 'Montserrat';
      padding: 10px 30px;
      cursor: pointer;
      background-color: #7E929F;
      border: none;
      border-radius: 4px;
      font-size: 14px;
  }
  
  .bookholder-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .bookcard-container {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }
  

  .bookcard {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
    margin: 0 0 30px 30px;
  }
  
  .bookcard-cover {
    margin-bottom: 5px;
    background-image: url(${bookCover});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
  }

  .bookcard-cover_img {
    border-radius: 4px;
    width: 120px;
    height: 200px;
    object-fit: cover;
  }

  .bookcard-author {
    overflow: hidden;
    max-height: 80px;
  }

  .bookcard-name, .bookcard-author_p {
    color: #212020;
    font-size: 14px;
    margin: 0 0 5px 0;
    text-align: center;
  }

  .want-read_btn {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 15px;
    cursor: pointer;
    background-color: #C89566;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
  }
`;

const LibraryScene = () => {
  const history = useHistory();
  const location = useLocation();
  const [books, setBooks] = useState(null);


  return (
    <StyledLibraryScene className="library-holder">
      <div className="sidebar-container">
        <div className="book-filters_holder">
          <Formik
            initialValues={{
              picked: '',
            }}
            onSubmit={(values) =>
              getBooks(values.picked)
                .then((data) => {
                  setBooks(data);
                  history.push({ pathname: location.pathname, search: "?" + new URLSearchParams(`author=${values.picked}`) });
                })
            }
          >
            {({ values }) => (
              <Form className="book-filter_form">
                <div className="book-filter">
                  <p className="book-filter_p">
                    Author
                  </p>
                  <div>
                    <FormikCheckboxes name="picked" value="rowling" />
                    <label htmlFor="classic">Rowling</label>
                  </div>
                  <div>
                    <FormikCheckboxes name="picked" value="tolkien" />
                    <label htmlFor="classic">Tolkien</label>
                  </div>
                  <div>
                    <FormikCheckboxes name="picked" value="twain" />
                    <label htmlFor="classic">Twain</label>
                  </div>
                  <div>
                    <FormikCheckboxes name="picked" value="tolstoy" />
                    <label htmlFor="classic">Tolstoy</label>
                  </div>
                  <div>
                    <FormikCheckboxes name="picked" value="pushkin" />
                    <label htmlFor="classic">Pushkin</label>
                  </div>
                </div>

                {/* <div className="book-filter">
                  <p className="book-filter_p">
                    Language
                  </p>
                </div>
                <div>
                  <input type="checkbox" id="classic-books" name="classic" />
                  <label htmlFor="classic">English</label>
                </div>
                <div>
                  <input type="checkbox" id="classic-books" name="classic" />
                  <label htmlFor="classic">Spanish</label>
                </div>
                <div>
                  <input type="checkbox" id="classic-books" name="classic" />
                  <label htmlFor="classic">Italian</label>
                </div> */}
                <button type="submit" className="book-filter_btn">Search</button>
              </Form>
            )}
          </Formik>
          {/* <div className="book-search">
            <input
              className="book-searchfield"
              placeholder="Search..."
              type="text"
            />
          </div>
          <button className="book-search_btn">
            Search
          </button> */}
        </div>
      </div>
      <div className="bookholder-container">
        {/* <button
          type="button"
          onClick={() => {
            getBooks('rowling')
              .then((data) => {
                setBooks(data);
              })
          }}
        >
          Get Books
        </button> */}
        <div className="bookcard-container">
          {books &&
            books.map((book, index) => {
              const authors = book.author_name.join(", ");
              const covers = () => {
                let result = book.isbn === undefined ? '1' : book.isbn[0];
                return result;
              }
              return (
                <div className="bookcard" key={index}>
                  <div className="bookcard-cover" >
                    <img src={`https://covers.openlibrary.org/b/isbn/${covers()}-M.jpg`} alt="" className="bookcard-cover_img" />
                  </div>
                  <h4 className="bookcard-name">{book.title}</h4>
                  <div className="bookcard-author">
                    <p className="bookcard-author_p">
                      {authors}
                    </p>
                  </div>
                  <Link to={ROUTE.BOOK}
                    className="want-read_btn">
                    Want to read
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </StyledLibraryScene >
  );
};

export default LibraryScene;
