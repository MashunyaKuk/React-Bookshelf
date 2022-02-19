import React, { useContext } from 'react';
import styled from 'styled-components';
import background from '../assets/img/main-bg.png';
import RegisterModal from '../Components/ModalContent/RegisterModal';
import { ModalContext } from '../HOC/GlobalModalProvider';
import iconTariff from '../assets/img/icons/icon-tariff.png';
import iconLanguage from '../assets/img/icons/icon-language.png';
import iconReturn from '../assets/img/icons/icon-return.png';
import iconLibrary from '../assets/img/icons/icon-library.png';
import iconOffline from '../assets/img/icons/icon-offline.png';
import iconCollections from '../assets/img/icons/icon-collections.png';
import { ThemeContext } from '../HOC/GlobalThemeProvider';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors/userSelectors';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../Root/routes';
import { COLORS } from '../assets/styles/colors';
import Button from '../Components/Button';

const StyledMainScene = styled.div`
  font-family: 'Montserrat';
  max-width: 1170px;
  margin: auto;

  .main-screen-container {
    height: 500px;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 100px;
  }

  .main-screen-container__dark {
    height: 500px;
    margin-bottom: 100px;
    background-color: ${COLORS.BLACK};
    border: 1px solid white;
    border-radius: 4px;
    box-shadow: inset 0 0 25px;
  }

  .main-screen-textholder {
    padding-top: 170px;
    max-width: 500px;
    margin: auto;
    text-align: center;
    }

  .main-screen-title {
    font-size: 34px;
    line-height: 48px;
    margin-bottom: 30px;
  }

  .main-screen-description {
    margin-bottom: 30px;
    &_p {
      font-size: 16px;
    }
  }

  .advantages {
    &-container {
      padding: 0 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 100px;
    }

    &-row {
      @media (max-width: 1200px) {
        margin-bottom: 20px;
  }
      display: flex;
      justify-content: center;
      align-items: stretch;
      margin-bottom: 40px;
      :last-child {
        margin-bottom: 0;
      }
    }

    &-item {
      @media (max-width: 1200px) {
        padding: 20px;
        margin-right: 20px;
  }
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid ${COLORS.BLACK};
      padding: 30px;
      border-radius: 4px;
      margin-right: 40px;
      :nth-child(2n) {
        margin-right: 0;
      }
    }
    
    &-icon_img {
      width: 80px;
    }

    &-text {
      margin-left: 20px;
      max-width: 200px;
    }

    &-title {
      @media (max-width: 1200px) {
        font-size: 16px;
        line-height: 20px;
  }
      @media (max-width: 992px) {
        font-size: 14px;
        line-height: 16px;
  }
      font-size: 18px;
      margin-bottom: 10px;
      line-height: 24px;
    }

    &-description_p {
      @media (max-width: 1200px) {
        font-size: 12px;
        line-height: 18px;
  }  
      @media (max-width: 992px) {
        font-size: 10px;
        line-height: 14px;
  }
      font-size: 14px;
      line-height: 20px;
    }
  }

  .subscription {
    &-container {
      padding: 0 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 100px;
    }

    &-title {
      font-size: 26px;
      margin-bottom: 40px;
    }

    &-row {
      display: flex;
      justify-content: center;
      align-items: stretch;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      border: 1px solid ${COLORS.BLACK};
      padding: 30px;
      border-radius: 4px;
      margin-right: 40px;
      :last-child {
        margin-right: 0;
      }
    }

    &-tariff-name {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 20px;
    }

    &-tariff-description {
      margin-bottom: 20px;
    }

    &-tariff-description_p {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 15px;

      ::before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: ${COLORS.DARK_GREY};
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }  

    &-tariff-price {
      text-align: center;
      margin-bottom: 20px;

      &_span {
      font-weight: 600;
      font-size: 18px;
    }
    }
  }

  .top {
    &-container {
      padding: 0 150px;
      margin-bottom: 50px;
    }

    &-title {
      font-size: 26px;
      margin-bottom: 40px;
      text-align: center;
    }

    &-content {
      border: 1px solid ${COLORS.BLACK};
      border-radius: 4px;
      padding: 30px 40px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .collections {
    &-container {
      padding: 0 150px;
      margin-bottom: 100px;
      display: flex;
      justify-content: center;
      align-items: stretch;
    }

    &-item {
      border: 1px solid ${COLORS.BLACK};
      border-radius: 4px;
      text-align: center;
      margin-right: 20px;
      flex-basis: 100%;
      :last-child {
        margin-right: 0;
      }

      &_red {
        background-color: ${COLORS.RED};
      }

      &_blue {
        background-color: ${COLORS.BLUE};
      }

      &_green {
        background-color: ${COLORS.DARK_GREY};
      }
    }

    &-title {
      @media (max-width: 1200px) {
        padding: 50px;
  }
      @media (max-width: 992px) {
        padding: 30px;
        font-size: 16px;
        line-height: 20px;
  }
      //font-weight: 600;
      font-size: 18px;
      padding: 70px;
      color: ${COLORS.WHITE};
      line-height: 24px;
    }
  }
`;

const MainScene = () => {
  const setModalContent = useContext(ModalContext);
  const [theme, setTheme] = useContext(ThemeContext);
  const user = useSelector(userSelector);
  const history = useHistory();
  return (
    <StyledMainScene>
      <div className={(theme !== 'dark' ? "main-screen-container" : "main-screen-container__dark")}>
        <div className="main-screen-textholder">
          <h1 className="main-screen-title">
            Thousands of books you have always with you
          </h1>
          <div className="main-screen-description">
            <p className="main-screen-description_p">
              Online library
            </p>
          </div>
          {(user.loggedIn !== true)

            ?
            <Button type="submit"
              onClick={() => {
                setModalContent(
                  <RegisterModal />,
                );
              }}
              color={COLORS.ORANGE}>
              Register free
            </Button>

            :
            <Button type="submit"
              onClick={() => {
                history.push(PATHS.PROFILE_ABOUT(user.id));
              }}
              color={COLORS.BLUE}>
              My profile
            </Button>
          }
        </div>
      </div>
      <div className="advantages-container">
        <div className="advantages-row">
          <div className="advantages-item">
            <div className="advantages-icon">
              <img src={iconTariff} alt="icon-tariff" className="advantages-icon_img" />
            </div>
            <div className="advantages-text">
              <h3 className="advantages-title">
                30 days free period
              </h3>
              <div className="advantages-description">
                <p className="advantages-description_p">
                  Free period in the Premium tariff for new users
                </p>
              </div>
            </div>
          </div>
          <div className="advantages-item">
            <div className="advantages-icon">
              <img src={iconLanguage} alt="icon-tariff" className="advantages-icon_img" />
            </div>
            <div className="advantages-text">
              <h3 className="advantages-title">
                Best books on 7 languages
              </h3>
              <div className="advantages-description">
                <p className="advantages-description_p">
                  Many different books in English, Russian and others
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="advantages-row">
          <div className="advantages-item">
            <div className="advantages-icon">
              <img src={iconReturn} alt="icon-tariff" className="advantages-icon_img" />
            </div>
            <div className="advantages-text">
              <h3 className="advantages-title">
                Memorizing the place you stopped reading at
              </h3>
              <div className="advantages-description">
                <p className="advantages-description_p">
                  The possibility to return to stopped reading point of the book
                </p>
              </div>
            </div>
          </div>
          <div className="advantages-item">
            <div className="advantages-icon">
              <img src={iconLibrary} alt="icon-tariff" className="advantages-icon_img" />
            </div>
            <div className="advantages-text">
              <h3 className="advantages-title">
                More than 200 000 books
              </h3>
              <div className="advantages-description">
                <p className="advantages-description_p">
                  Big library of books you are looking for
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="advantages-row">
          <div className="advantages-item">
            <div className="advantages-icon">
              <img src={iconOffline} alt="icon-tariff" className="advantages-icon_img" />
            </div>
            <div className="advantages-text">
              <h3 className="advantages-title">
                Offline access
              </h3>
              <div className="advantages-description">
                <p className="advantages-description_p">
                  Save the books you want and read even when you dont't have internet connection
                </p>
              </div>
            </div>
          </div>
          <div className="advantages-item">
            <div className="advantages-icon">
              <img src={iconCollections} alt="icon-tariff" className="advantages-icon_img" />
            </div>
            <div className="advantages-text">
              <h3 className="advantages-title">
                We advice you books to read
              </h3>
              <div className="advantages-description">
                <p className="advantages-description_p">
                  Many interesting and diversified thematic collections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subscription-container">
        <h2 className="subscription-title">
          Subscription
        </h2>
        <div className="subscription-row">
          <div className="subscription-item">
            <h3 className="subscription-tariff-name">
              Standart
            </h3>
            <ul className="subscription-tariff-description">
              <li>
                <p className="subscription-tariff-description_p">
                  All books available
                </p>
              </li>
              <li>
                <p className="subscription-tariff-description_p">
                  Different general collections of books
                </p>
              </li>
              <li>
                <p className="subscription-tariff-description_p">
                  Access across one device type
                </p>
              </li>
            </ul>
            <div className="subscription-tariff-price">
              <span className="subscription-tariff-price_span">
                $3.99 at month
              </span>
            </div>
            <Button
              color={COLORS.DARK_GREY}
            >
              Subscribe
            </Button>
          </div>
          <div className="subscription-item">
            <h3 className="subscription-tariff-name">
              Premium
            </h3>
            <ul className="subscription-tariff-description">
              <li>
                <p className="subscription-tariff-description_p">
                  All books available
                </p>
              </li>
              <li>
                <p className="subscription-tariff-description_p">
                  Personal recommendations of books
                </p>
              </li>
              <li>
                <p className="subscription-tariff-description_p">
                  Access across many device types
                </p>
              </li>
            </ul>
            <div className="subscription-tariff-price">
              <span className="subscription-tariff-price_span">
                $5.99 at month
              </span>
            </div>
            <Button
              color={COLORS.RED}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="collections-container">
        <div className="collections-item collections-item_red">
          <p className="collections-title">
            Books to get you in the mood for New Year
          </p>
        </div>
        <div className="collections-item collections-item_blue">
          <p className="collections-title">
            Books to read before you sleep
          </p>
        </div>
        <div className="collections-item collections-item_green">
          <p className="collections-title">
            Books that you will read in one breath
          </p>
        </div>
      </div>
    </StyledMainScene>
  );
};

export default MainScene;
