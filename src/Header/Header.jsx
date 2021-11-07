import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { ROUTE, PATHS } from '../Root/routes';
import { ModalContext } from '../HOC/GlobalModalProvider';
import LoginModal from '../Modal/ModalContent/LoginModal';
import RegisterModal from '../Modal/ModalContent/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/selectors/userSelectors';
import { logOutUser } from '../store/actions/userActions';
import { logoutUser } from '../api/instance';

const StyledHeader = styled.header`
  font-family: 'Montserrat';
  margin: 0px 15px;
  
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

  .header-menu_link {
    font-family: 'Montserrat';
    font-size: 16px;
    color: #212020;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  .header-logo{
    display: flex;
    align-items: center;
    //justify-content: space-between;
    &_link {
      color: #212020;
      font-size: 18px;
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    &_img{
      width: 90%;
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
  return (
    <StyledHeader className="header-container">
      <div className="header-row">
        <div className="header-item">
          <div className="header-logo">
            <Link to="/" className="header-logo_link">
              <img className="header-logo_img" src={logo} />
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
                <Link to="/" className="header-menu_link">About</Link>
              </li>

              {(user.find(item => item.loggedIn === true))

                ? <li className="header-menu_item">
                  <button
                    className="header-menu_link"
                    type="button"
                    onClick={() => {
                      console.log('user', user.find(user => user).id);
                      moveToProfile(user.find(user => user).id)
                    }}
                  >My profile
                  </button>
                </li>

                : <li className="header-menu_item">
                  <button
                    className="header-menu_link"
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
          <div className="header-search">
            <input type="search" className="header-searchfield" placeholder="Search..." />
            {/* <img src="#"></img> */}
          </div>
          <div className="header-login">

            {(user.find(item => item.loggedIn === true))

              ? <button
                type="button"
                className="logout-btn"
                onClick={() => {
                  logoutUser(user.find(user => user).id)
                    .then(() => {
                      console.log('userData')
                      dispatch(logOutUser());
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
