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
import Button from '../Components/Button';
import { COLORS } from '../assets/styles/colors';
import { avatarRemove } from '../store/actions/avatarActions';

const StyledHeader = styled.header`
  font-family: 'Montserrat';
  margin: auto 15px;

  @media (max-width: 480px) {
    margin: auto 10px;
  }  
  
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1170px;
    margin: 30px auto;

    @media (max-width: 767px) {
      margin: 20px auto;
    }

    @media (max-width: 480px) {
      margin: 10px auto;
    }
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

    @media (max-width: 767px) {
      margin-right: 10px;
    }
    @media (max-width: 480px) {
      margin-right: 5px;
    }
  }

  .header-menu_link, .header-menu_link__dark {
    font-family: 'Montserrat';
    font-size: 16px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    
    @media (max-width: 992px) {
      font-size: 14px;
    }      
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  .header-menu_link__dark {
    color: ${COLORS.WHITE};
  }

  .header-logo{
    display: flex;
    align-items: center;
    &_link {
      font-size: 18px;
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-right: 10px;
      
      @media (max-width: 992px) {
        font-size: 16px;
      }
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
    &_img{
      width: 50px;
      color: ${COLORS.GREEN};

      @media (max-width: 767px) {
        width: 35px;
      }
    }
  }

  .header-search{
    margin-right: 15px;
  }

  .header-searchfield {
    border: none;
    background-color: ${COLORS.GREY};
    border-radius: 4px;
    height: 30px;
    padding: 5px;
    
    :focus-visible {
      outline: none;
    }
 }
 
  .logo-text_link {
    @media (max-width: 480px) {
      display: none;
    }
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
            <Link to="/" className="header-logo_link logo-text_link">
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

              ? <Button
                type="button"
                color={COLORS.BLUE}
                onClick={() => {
                  logoutUser(user.id)
                    .then(() => {
                      dispatch(logOutUser());
                      dispatch(booksToReadRemoveAll());
                      dispatch(readingBookRemoveAll());
                      dispatch(readBookRemoveAll());
                      dispatch(avatarRemove());
                      history.push("/");
                    })
                }}>
                Logout
              </Button>

              : <Button
                type="submit"
                color={COLORS.BLUE}
                onClick={() => {
                  setModalContent(
                    <LoginModal />,
                  );
                }}
              >
                Login
              </Button>}

          </div>
        </div>
      </div>
    </StyledHeader >
  );
};

export default Header;
