import React, { useState } from 'react';
import styled from 'styled-components';
import IconTelegram from '../assets/img/icons/telegram-plane-brands.svg';
import IconInstagram from '../assets/img/icons/instagram-brands.svg';
import IconFacebook from '../assets/img/icons/facebook-brands.svg';
import { Link } from 'react-router-dom';
import { ROUTE } from '../Root/routes';


const StyledFooter = styled.footer`
  font-family: 'Montserrat';
  background-color: #212020;

  .footer-holder {
    margin: 0 15px;
  }

    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0px;
      max-width: 1170px;
      margin: 30px auto 0px auto;
    }

    .footer-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
    }

    .footer-menu_item {
      margin-bottom: 15px;
}
    
    .footer-menu_link {
      color: #F6F5F3;
      font-size: 14px;
    }


    .footer-social_row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-social_row {
      margin-bottom: 15px;
    }

    .footer-social_link {
      margin-right: 30px;
      :last-child {
        margin-right: 0px;
      }
    }
    
    .footer-icon {
      color: #F6F5F3;
      height: 30px;
    } 

    .footer-text_p {
      margin: 0px;
      color: #F6F5F3;
      font-size: 10px;
    }
`;

const Footer = () => {
  return (
    <StyledFooter className="footer-container">
      <div className="footer-holder">
        <div className="footer-row">
          <div className="footer-item">
            <nav className="footer-menu">
              <ul className="footer-menu_list">
                <li className="footer-menu_item">
                  <Link to="#" className="footer-menu_link">About</Link>
                </li>
                <li className="footer-menu_item">
                  <Link to="#" className="footer-menu_link">Subscription</Link>
                </li>
                <li className="footer-menu_item">
                  <Link to={ROUTE.LIBRARY} className="footer-menu_link">Library</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer-item">
            <div className="footer-social_row">
              <Link to="#" className="footer-social_link">
                <IconTelegram className="footer-icon" />
              </Link>
              <Link to="#" className="footer-social_link">
                <IconInstagram className="footer-icon" />
              </Link>
              <Link to="#" className="footer-social_link">
                <IconFacebook className="footer-icon" />
              </Link>
            </div>
            <div className="footer-text">
              <p className="footer-text_p">© 2021 Bookshelf</p>
            </div>
          </div>
        </div>
      </div>

    </StyledFooter>
  );
};

export default Footer;
