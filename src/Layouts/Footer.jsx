import React, { useContext } from 'react';
import styled from 'styled-components';
import IconTelegram from '../assets/img/icons/telegram-plane-brands.svg';
import IconInstagram from '../assets/img/icons/instagram-brands.svg';
import IconFacebook from '../assets/img/icons/facebook-brands.svg';
import { Link, useHistory } from 'react-router-dom';
import { ROUTE, PATHS } from '../Root/routes';
import { ThemeContext } from '../HOC/GlobalThemeProvider';
import { useSelector } from 'react-redux';
import { ModalContext } from '../HOC/GlobalModalProvider';
import { userSelector } from '../store/selectors/userSelectors';
import RegisterModal from '../Components/ModalContent/RegisterModal';
import { useDispatch } from 'react-redux';
import { userTheme } from '../store/actions/userThemeAction';
import Button from '../Components/Button';
import { COLORS } from '../assets/styles/colors';

const StyledFooter = styled.footer`
  font-family: 'Montserrat';
  background-color: ${COLORS.BLACK};
  

  .footer-holder {
    margin: auto 15px;
  }

    .footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0px;
      max-width: 1170px;
      margin: 0px auto;
    }

    .footer-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: column;
    }

    .footer-menu_item {
      margin-bottom: 15px;

      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
    }
    
    .footer-menu_link {
      font-family: 'Montserrat';
      color: ${COLORS.WHITE};
      font-size: 16px;
      border: none;
      background-color: transparent;
      padding: 0;
      cursor: pointer;
      
      @media (max-width: 992px) {
        font-size: 14px;
      }
      @media (max-width: 767px) {
        font-size: 12px;
      }
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
      color: ${COLORS.WHITE};
      height: 30px;

      @media (max-width: 767px) {
        height: 20px;
      }
    } 

    .footer-text {
      margin-bottom: 15px;
        &_p {
          margin: 0px;
          color: ${COLORS.WHITE};
          font-size: 12px;
            
          @media (max-width: 992px) {
            font-size: 10px;
          }
          @media (max-width: 767px) {
            font-size: 8px;
          }
        }
    }
`;

const Footer = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const setModalContent = useContext(ModalContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const moveToProfile = (userId) => {
    history.push(PATHS.PROFILE_ABOUT(userId))
  }

  return (
    <StyledFooter className="footer-container">
      <div className="footer-holder">
        <div className="footer-row">
          <div className="footer-item">
            <nav className="footer-menu">
              <ul className="footer-menu_list">

                <li className="footer-menu_item">
                  <Link to="/" className="footer-menu_link">About</Link>
                </li>

                {/* <li className="footer-menu_item">
                  <Link to="#" className="footer-menu_link">Register</Link>
                </li> */}

                {(user.loggedIn === true)

                  ? <li className="footer-menu_item">
                    <button
                      className="footer-menu_link"
                      type="button"
                      onClick={() => {
                        moveToProfile(user.id)
                      }}
                    >My profile
                    </button>
                  </li>

                  : <li className="footer-menu_item">
                    <button
                      className="footer-menu_link"
                      type="button"
                      onClick={() => {
                        setModalContent(
                          <RegisterModal />,
                        );
                      }}
                    >Registration
                    </button>
                  </li>}

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
            <Button
              color={COLORS.GREEN}
              onClick={() => {
                theme !== 'dark'
                  ?
                  dispatch(userTheme('dark')) && setTheme('dark')
                  :
                  dispatch(userTheme('light')) && setTheme('light')
              }}>
              Switch Theme
            </Button>
          </div>
        </div>
      </div>

    </StyledFooter >
  );
};

export default Footer;
