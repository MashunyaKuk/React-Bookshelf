import React from 'react';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { ROUTE } from '../Root/routes';

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
    font-size: 18px;
    color: #212020;
  }

  .header-logo{
    display: flex;
    align-items: center;
    //justify-content: space-between;
    &_link {
      color: #212020;
      font-size: 20px;
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

  .header-login {
    &_link {
      color: #212020;
      font-size: 18px;
    }
  }
`;

const Header = () => {
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
                <Link to="#" className="header-menu_link">About</Link>
              </li>
              <li className="header-menu_item">
                <Link to="#" className="header-menu_link">Subscription</Link>
              </li>
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
            <Link to="#" className="header-login_link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
