import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { PATHS } from '../Root/routes';
import { logOutUser } from '../store/actions/userActions';
import testUser from '../assets/img/testUser.png';

const StyledProfileScene = styled.div`
  font-family: 'Montserrat';
  margin: 0 15px;

  .profile-screen {
    
    &-container {
      display: flex;
      align-items: flex-start;
      margin: auto;
      max-width: 1170px;
    }

    &-sidebar {
      margin-right: 60px;
      border: 1px solid #212020;
      border-radius: 4px;
      padding: 15px 50px 15px 50px;
    }

    &-userphoto {
      text-align: center;
      margin-bottom: 20px;

      &_img {
        width: 100px;
      }
    }

    &-username {
      margin-bottom: 30px;

      &_p {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 600;
        :last-child {
          margin-bottom: 0px;
        }
      }
    }
    
    &-navblock {
      font-size: 18px;
      margin-bottom: 20px;
    }

    &-navigation {
      margin-bottom: 30px;
    }

    &-item {
      font-size: 14px;
      margin-bottom: 15px;
      padding: 10px 10px;
      //border: 1px solid #212020;
      border-radius: 4px;
      background-color:#e7e7e7;

      &_a {
        color: #212020;
      }
    }  
}

    .logout-btn {
      color: #F6F5F3;
      font-family: 'Montserrat';
      padding: 10px 30px;
      cursor: pointer;
      background-color: #9f7e97;
      border: none;
      border-radius: 4px;
      font-size: 14px;
    }
`;

const ProfileScene = (props) => {
  const urlParams = useParams();
  const urlParamsId = urlParams.userId
  const history = useHistory();
  const dispatch = useDispatch();

  const { children } = props;
  return (
    <StyledProfileScene>
      <div className="profile-screen-container">
        <div className="profile-screen-sidebar">
          <div className="profile-screen-user">
            <div className="profile-screen-userphoto">
              <img src={testUser} alt="userphoto" className="profile-screen-userphoto_img" />
            </div>
            <div className="profile-screen-username">
              <p className="profile-screen-username_p">Your name</p>
              <p className="profile-screen-username_p">Your surname</p>
            </div>
            <h3 className="profile-screen-navblock">
              Profile
            </h3>
          </div>
          <nav className="profile-screen-navigation">
            <ul>

              <Link to={PATHS.PROFILE_ABOUT(urlParamsId)} className="profile-screen-item_a">
                <li className="profile-screen-item">
                  My profile
                </li>
              </Link>

              <Link to={PATHS.PROFILE_EDIT(urlParamsId)} className="profile-screen-item_a">
                <li className="profile-screen-item">
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
              <Link to={PATHS.PROFILE_READING(urlParamsId)} className="profile-screen-item_a">
                <li className="profile-screen-item">
                  Reading now
                </li>
              </Link>

              <Link to={PATHS.PROFILE_WANT(urlParamsId)} className="profile-screen-item_a">
                <li className="profile-screen-item">
                  Want to read
                </li>
              </Link>

              <Link to={PATHS.PROFILE_FINISHED(urlParamsId)} className="profile-screen-item_a">
                <li className="profile-screen-item">
                  Already read
                </li>
              </Link>

            </ul>
          </nav>
          <button
            type="button"
            className="logout-btn"
            onClick={() => {
              dispatch(logOutUser());
              history.push("/");
            }}>
            Logout
          </button>
        </div>
        <div className="profile-screen-content">
          {children}
        </div>
      </div>
    </StyledProfileScene>
  );
};

export default ProfileScene;