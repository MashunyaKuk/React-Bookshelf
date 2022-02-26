import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getBooks } from '../api/libraryInstance';
import { Formik, Field, Form } from 'formik';
import FormikRadio from '../Components/FormikInputs/FormikRadio';
import ReactPaginate from "react-paginate";
import Bookcard from "../Components/Bookcard";
import { newLibraryAdd } from '../store/actions/libraryActions';
import { librarySelector } from '../store/selectors/librarySelector';
import MyLoader from '../Components/LibraryLoaderSceleton';
import search from '../assets/img/icons/search.png';
import { COLORS } from '../assets/styles/colors';
import Button from '../Components/Button';

const StyledLibraryScene = styled.div`
font-family: 'Montserrat';
margin: auto;
display: flex;
align-items: flex-start;
max-width: 1170px;

  .sidebar-container {
    margin: 0 20px 0 15px;

    @media (max-width: 767px) {
      margin-right: 10px;
    }
    @media (max-width: 480px) {
      margin-left: 10px;
    }
  }

  .book {
    &-filter_form {
      margin-bottom: 20px;

      @media (max-width: 992px) {
        margin-bottom: 15px;
      }
      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
    }

    &-filters_holder {
      border: 1px solid ${COLORS.BLACK};
      border-radius: 4px;
      padding: 15px 65px 10px 20px;

      @media (max-width: 767px) {
        padding: 10px 45px 5px 10px;
      }
      @media (max-width: 480px) {
        padding: 10px 15px 5px 10px;
      }
    }

    &-filter {
      margin-bottom: 15px;

      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
      &_p {
        margin-bottom: 15px;
        color: ${COLORS.DARK_GREY};

        @media (max-width: 992px) {
          font-size: 14px;
        }
        @media (max-width: 767px) {
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
      &_div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        @media (max-width: 992px) {
          font-size: 14px;
        }
        @media (max-width: 767px) {
          font-size: 12px;
        }

      }
    }

    &-search {
      margin-bottom: 10px;
      width: 115px;
      
      @media (max-width: 992px) {
        width: 105px;
      }
      @media (max-width: 767px) {
        width: 85px;
      }
      @media (max-width: 480px) {
        width: 50px;
      }
    }

    &-searchfield {
      background-image: url(${search});
      background-repeat: no-repeat;
      background-size: 15%;
      background-position: left 10px center;
      border: none;
      background-color: ${COLORS.GREY};
      border-radius: 4px;
      height: 30px;
      padding: 5px 5px 5px 38px;
      width: 100%;

      &::placeholder {

        @media (max-width: 480px) {
          color: transparent;
        }
      }
      
      @media (max-width: 992px) {
        font-size: 12px;
      }
      @media (max-width: 767px) {
        font-size: 10px;
        background-size: 10%;
        padding-left: 27px;
        height: 23px;
      }
      @media (max-width: 480px) {
        background-size: 15%;
      }

    
    :focus-visible {
      outline: none;
      }
  }
}

  .bookholder-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    min-height: calc(100vh - 265px);
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

    @media (max-width: 767px) {
      margin: 10px 0;
    }
  }

  .previousBttn, .nextBttn, .paginationDisabled, .paginationActive, .paginationAll {
    margin-right: 10px;
    font-size: 16px;
    cursor: pointer;
    color: ${COLORS.DARK_GREY};

    @media (max-width: 767px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }

  .paginationActive {
    font-size: 20px;
    color: ${COLORS.BLACK};
    
    @media (max-width: 767px) {
      font-size: 16px;
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
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
                  <div className="book-filter_div">
                    <FormikRadio name="picked" value="rowling" />
                    <label htmlFor="classic">Rowling</label>
                  </div>
                  <div className="book-filter_div">
                    <FormikRadio name="picked" value="tolkien" />
                    <label htmlFor="classic">Tolkien</label>
                  </div>
                  <div className="book-filter_div">
                    <FormikRadio name="picked" value="twain" />
                    <label htmlFor="classic">Twain</label>
                  </div>
                  <div className="book-filter_div">
                    <FormikRadio name="picked" value="tolstoy" />
                    <label htmlFor="classic">Tolstoy</label>
                  </div>
                  <div className="book-filter_div">
                    <FormikRadio name="picked" value="pushkin" />
                    <label htmlFor="classic">Pushkin</label>
                  </div>
                </div>
                <Button
                  type="submit"
                  color={COLORS.BLUE}
                >
                  Search
                </Button>
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
