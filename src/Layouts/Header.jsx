import React, { useContext } from 'react';
import styled from 'styled-components';
import IconLogo from '../assets/img/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { ROUTE, PATHS } from '../Root/routes';
import { ModalContext } from '../HOC/GlobalModalProvider';
import LoginModal from '../Components/ModalContent/LoginModal';
import RegisterModal from '../Components/ModalContent/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/selectors/userSelectors';
import { logOutUser } from '../store/actions/userActions';
import { booksToReadRemoveAll } from '../store/actions/bookToReadActions';
import { logoutUser } from '../api/instance';
import { readingBookRemoveAll } from '../store/actions/readingNowBooksActions';
import { readBookRemoveAll } from '../store/actions/readBooksActions';
import { userThemeSelector } from '../store/selectors/userThemeSelector';

const StyledHeader = styled.header`
  font-family: 'Montserrat';
  margin: auto 15px;
  
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 30px auto;
  }

  .header-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-menu_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-menu_item {
    margin-right: 15px;
    :last-child {
      margin-right: 0px;
    }
  }

  .header-menu_link, .header-menu_link__dark {
    font-family: 'Montserrat';
    font-size: 16px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  .header-menu_link__dark {
    color: #F6F5F3;
  }

  .header-logo{
    display: flex;
    align-items: center;
    &_link {
      //color: #212020;
      font-size: 18px;
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-right: 10px;
      
    }
    &_img{
      width: 50px;
      color: #7e9f8b;
    }
  }

  .header-search{
    margin-right: 15px;
  }

  .header-searchfield {
    border: none;
    background-color: #e7e7e7;
    border-radius: 4px;
    height: 30px;
    padding: 5px;
    
    :focus-visible {
      outline: none;
    }
 }
    
    .login_btn, .logout-btn {
      color: #F6F5F3;
      font-family: 'Montserrat';
      padding: 10px 30px;
      cursor: pointer;
      background-color: #7E929F;
      border: none;
      border-radius: 4px;
      font-size: 14px;
  }

`;

const Header = () => {
  const setModalContent = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const moveToProfile = (userId) => {
    history.push(PATHS.PROFILE_ABOUT(userId))
  }
  const currentTheme = useSelector(userThemeSelector);

  return (
    <StyledHeader className="header-container">
      <div className="header-row">
        <div className="header-item">
          <div className="header-logo">
            <Link to="/" className="header-logo_link">
              <IconLogo className="header-logo_img" />
            </Link>
            <Link to="/" className="header-logo_link">
              BookShelf
            </Link>
          </div>
        </div>
        <div className="header-item">
          <nav className="header-menu">
            <ul className="header-menu_list">

              <li className="header-menu_item">
                <Link to="/" className="header-menu_link"> About</Link>
              </li>

              {(user.loggedIn === true)

                ? <li className="header-menu_item">
                  <button
                    className={(currentTheme.theme !== 'dark' ? "header-menu_link" : "header-menu_link__dark")}
                    type="button"
                    onClick={() => {
                      console.log('user', user.id);
                      moveToProfile(user.id)
                    }}
                  >My profile
                  </button>
                </li>

                : <li className="header-menu_item">
                  <button
                    className={(currentTheme.theme !== 'dark' ? "header-menu_link" : "header-menu_link__dark")}
                    type="button"
                    onClick={() => {
                      setModalContent(
                        <RegisterModal />,
                      );
                    }}
                  >Registration
                  </button>
                </li>}
              <li className="header-menu_item">
                <Link to={ROUTE.LIBRARY} className="header-menu_link">Library</Link>
              </li>

            </ul>
          </nav>
        </div>
        <div className="header-item">
          <div className="header-login">

            {(user.loggedIn === true)

              ? <button
                type="button"
                className="logout-btn"
                onClick={() => {
                  logoutUser(user.id)
                    .then(() => {
                      console.log('userData')
                      dispatch(logOutUser());
                      dispatch(booksToReadRemoveAll());
                      dispatch(readingBookRemoveAll());
                      dispatch(readBookRemoveAll());
                      history.push("/");
                      setModalContent(false);
                    })
                }}>
                Logout
              </button>

              : <button
                type="submit"
                onClick={() => {
                  setModalContent(
                    <LoginModal />,
                  );
                }}
                className="login_btn"
              >
                Login
              </button>}

          </div>
        </div>
      </div>
    </StyledHeader >
  );
};

export default Header;
