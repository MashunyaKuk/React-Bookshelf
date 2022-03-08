import React from 'react';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { PATHS } from '../Root/routes';
import { logOutUser } from '../store/actions/userActions';
import { booksToReadRemoveAll } from '../store/actions/bookToReadActions';
import testUser from '../assets/img/testUser.png';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors/userSelectors';
import { readingBookRemoveAll } from '../store/actions/readingNowBooksActions';
import { readBookRemoveAll } from '../store/actions/readBooksActions';
import Button from '../Components/Button';
import { COLORS } from '../assets/styles/colors';
import { avatarRemove } from '../store/actions/avatarActions';
import { userAvatarSelector } from '../store/selectors/avatarSelector';

const StyledProfileScene = styled.div`
  font-family: 'Montserrat';
  display: flex;
  align-items: flex-start;
  margin: auto;
  max-width: 1170px;
  min-height: calc(100vh - 265px);
  padding: 0 20px;

  @media (max-width: 480px) {
    padding: 0 10px;
  }

  .profile-screen {
    &-sidebar {
      margin-right: 60px;
      margin-bottom: 30px;
      border: 1px solid ${COLORS.BLACK};
      border-radius: 4px;
      padding: 15px 50px 15px 50px;
      
      @media (max-width: 992px) {
        padding: 15px 30px 20px 30px;
      }
      @media (max-width: 767px) {
        padding: 10px 20px 15px 20px;
        margin-right: 15px;
      }
      @media (max-width: 480px) {
        padding: 7px 15px 13px 15px;
        margin-right: 10px;
        margin-bottom: 15px;
      }
    }

    &-userphoto {
      text-align: center;
      margin-bottom: 20px;

      @media (max-width: 767px) {
        margin-bottom: 10px;
      }

      &_img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;

        @media (max-width: 767px) {
          width: 80px;
          height: 80px;
        }
      }
    }

    &-username {
      margin-bottom: 30px;

      @media (max-width: 767px) {
        margin-bottom: 20px;
      }
      @media (max-width: 480px) {
        margin-bottom: 15px;
      }

      &_p {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 600;
        :last-child {
          margin-bottom: 0px;
        }

        @media (max-width: 767px) {
          font-size: 12px;
        }
        @media (max-width: 480px) {
          margin-bottom: 0;
          font-size: 10px;
      }
      }
    }
    
    &-navblock {
      font-size: 18px;
      margin-bottom: 20px;

      @media (max-width: 767px) {
        font-size: 16px;
      }
      @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }

    &-navigation {
      margin-bottom: 30px;

      @media (max-width: 480px) {
        margin-bottom: 15px;
      }
    }

    &-item, &-item__active {
      min-width: 95px;
      font-size: 14px;
      margin-bottom: 15px;
      padding: 10px 0 10px 10px;
      border-radius: 4px;
      background-color: ${COLORS.GREY};

      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
      @media (max-width: 480px) {
        margin-bottom: 8px;
      }

      &__active {
        background-color: ${COLORS.LIGHT_GREY};
        color: ${COLORS.GREY};
        }
      &_a {
        color: ${COLORS.BLACK};
      }

      @media (max-width: 992px) {
        font-size: 13px;
        padding: 9px 0 9px 9px;
      }
      @media (max-width: 480px) {
        font-size: 12px;
        padding: 8px 0 8px 8px;
      }
    }  
      &-content {
        margin-left: 15px;

        @media (max-width: 992px) {
          margin-left: 5px;
        }
      }
    }
`;

const ProfileScene = (props) => {
  const urlParams = useParams();
  const urlParamsId = urlParams.userId;
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const currentUrl = window.location.pathname;
  let path = currentUrl.split('/')[3];
  const userAvatar = useSelector(userAvatarSelector);

  const { children } = props;
  return (
    <StyledProfileScene>
      <div className="profile-screen-sidebar">
        <div className="profile-screen-user">
          <div className="profile-screen-userphoto">
            {userAvatar.avatarImage ?
              <img src={userAvatar.avatarImage} alt="userphoto" className="profile-screen-userphoto_img" />
              :
              <img src={testUser} alt="userphoto" className="profile-screen-userphoto_img" />
            }
          </div>
          <div className="profile-screen-username">
            <p className="profile-screen-username_p">
              {user.name}
            </p>
            <p className="profile-screen-username_p">
              {user.surname}
            </p>
          </div>
          <h3 className="profile-screen-navblock">
            Profile
          </h3>
        </div>
        <nav className="profile-screen-navigation">
          <ul>

            <Link to={PATHS.PROFILE_ABOUT(urlParamsId)} className="profile-screen-item_a">
              <li className={path === "about" ? "profile-screen-item__active" : "profile-screen-item"}>
                My profile
              </li>
            </Link>

            <Link to={PATHS.PROFILE_EDIT(urlParamsId)} className="profile-screen-item_a">
              <li className={path === "edit" ? "profile-screen-item__active" : "profile-screen-item"}>
                Edit profile
              </li>
            </Link>
          </ul>
        </nav>

        <h3 className="profile-screen-navblock">
          My library
        </h3>

        <nav className="profile-screen-navigation">
          <ul>
            <Link to={PATHS.PROFILE_WANT(urlParamsId)} className="profile-screen-item_a">
              <li className={path === "want" ? "profile-screen-item__active" : "profile-screen-item"}>
                Want to read
              </li>
            </Link>

            <Link to={PATHS.PROFILE_READING(urlParamsId)} className="profile-screen-item_a">
              <li className={path === "reading" ? "profile-screen-item__active" : "profile-screen-item"}>
                Reading now
              </li>
            </Link>

            <Link to={PATHS.PROFILE_FINISHED(urlParamsId)} className="profile-screen-item_a">
              <li className={path === "finished" ? "profile-screen-item__active" : "profile-screen-item"}>
                Already read
              </li>
            </Link>

          </ul>
        </nav>
        <Button
          type="button"
          color={COLORS.PURPLE}
          onClick={() => {
            dispatch(logOutUser());
            dispatch(booksToReadRemoveAll());
            dispatch(readingBookRemoveAll());
            dispatch(readBookRemoveAll());
            dispatch(avatarRemove());
            history.push("/");
          }}>
          Logout
        </Button>
      </div>
      <div className="profile-screen-content">
        {children}
      </div>
    </StyledProfileScene >
  );
};

export default ProfileScene;
