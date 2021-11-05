import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainScene from '../Scenes/MainScene';
import LibraryScene from '../Scenes/LibraryScene';
import ProfileScene from '../Scenes/ProfileScene';
import EditProfileScene from '../Scenes/ProfileInnerScenes/EditProfileScene';
import ReadingNowScene from '../Scenes/ProfileInnerScenes/ReadingNowScene';
import MyProfileScene from '../Scenes/ProfileInnerScenes/MyProfileScene';
import WantToReadScene from '../Scenes/ProfileInnerScenes/WantToReadScene';
import AlreadyReadScene from '../Scenes/ProfileInnerScenes/AlreadyReadScene';
import { ROUTE } from '../Root/routes';

const RootRouter = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTE.LIBRARY}>
          <LibraryScene />
        </Route>
        <Route path={ROUTE.PROFILE}>
          <ProfileScene>
            <Route path={ROUTE.PROFILE_ABOUT}>
              <MyProfileScene />
            </Route>
            <Route path={ROUTE.PROFILE_EDIT}>
              <EditProfileScene />
            </Route>
            <Route path={ROUTE.PROFILE_READING}>
              <ReadingNowScene />
            </Route>
            <Route path={ROUTE.PROFILE_WANT}>
              <WantToReadScene />
            </Route>
            <Route path={ROUTE.PROFILE_FINISHED}>
              <AlreadyReadScene />
            </Route>
          </ProfileScene>
        </Route>
        <Route exact path="/">
          <MainScene />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default RootRouter;
