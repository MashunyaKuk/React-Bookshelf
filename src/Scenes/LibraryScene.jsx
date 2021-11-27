import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getBooks } from '../api/libraryInstance';
import { Formik, Field, Form } from 'formik';
import FormikCheckboxes from '../Components/FormikInputs/FormikCheckboxes';
import ReactPaginate from "react-paginate";
import Bookcard from "../Components/Bookcard";
import { newLibraryAdd } from '../store/actions/libraryActions';
import { librarySelector } from '../store/selectors/librarySelector';
import MyLoader from '../Components/LibraryLoaderSceleton';
import search from '../assets/img/icons/search.png';


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
    margin-bottom: 20px;
  }

  .book-filters_holder {
    border: 1px solid #212020;
    border-radius: 4px;
    padding: 15px 65px 15px 20px;
}

  .book-filter {
    margin-bottom: 15px;
    &_p {
      margin-bottom: 15px;
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
      background-image: url(${search});
      background-repeat: no-repeat;
      background-size: 15%;
      background-position: left 10px center;
      border: none;
      background-color: #e7e7e7;
      border-radius: 4px;
      height: 30px;
      padding: 5px 5px 5px 38px;
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
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .bookcard-container {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }
  
  .paginationBttns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .previousBttn, .nextBttn, .paginationDisabled, .paginationActive, .paginationAll {
    margin-right: 10px;
    font-size: 16px;
    cursor: pointer;
    color: #6E7064;
  }

  .paginationActive {
    font-size: 20px;
    color: #212020;
  }
`;

const LibraryScene = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(0);
  const booksPerPage = 15;
  const pagesVisited = pageNumber * booksPerPage;
  const libraryList = useSelector(librarySelector);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [loading, setLoading] = useState(false);

  return (
    <StyledLibraryScene className="library-holder">
      <div className="sidebar-container">
        <div className="book-filters_holder">
          <Formik
            initialValues={{
              picked: '',
            }}
            onSubmit={(values) =>
              setLoading(true) ||
              getBooks(values.picked)
                .then((data) => {
                  setLoading(true);
                  dispatch(newLibraryAdd(data));
                  history.push({ pathname: location.pathname, search: "?" + new URLSearchParams(`author=${values.picked}`) });
                  setLoading(false)
                })
            }>
            {() => (
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
                <button type="submit" className="book-filter_btn">Search</button>
              </Form>
            )}
          </Formik>
          <div className="book-search">
            <input
              className="book-searchfield"
              placeholder="Search by author..."
              type="text"
              onChange={(event) =>
                event.target.value.length > 3 &&
                (setLoading(true) || getBooks(event.target.value)
                  .then((data) => {
                    setLoading(true);
                    dispatch(newLibraryAdd(data));
                    history.push({ pathname: location.pathname, search: "?" + new URLSearchParams(`author=${event.target.value}`) });
                    setLoading(false)
                  })
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="bookholder-container">
        <div className="bookcard-container">
          {loading ? <MyLoader /> :
            libraryList
              .slice(pagesVisited, pagesVisited + booksPerPage)
              .map((book) => {
                const authors = book.author_name.join(", ");
                const covers = () => {
                  let result = book.isbn === undefined ? '1' : book.isbn[0];
                  return result;
                }
                return (
                  <Bookcard key={book._version_} id={book._version_} title={book.title} authors={authors} cover={covers} all={book} />
                );
              }
              )
          }
        </div>
        {libraryList.length !== 0 &&
          <ReactPaginate
            previousLabel="< "
            nextLabel=" >"
            pageCount={Math.ceil(libraryList.length / booksPerPage)}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageClassName={"paginationAll"}
          />
        }
      </div>
    </StyledLibraryScene >
  );
};

export default LibraryScene;
