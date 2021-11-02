import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainScene from '../Scenes/MainScene';
import LibraryScene from '../Scenes/LibraryScene';
import { ROUTE } from '../Root/routes';

const RootRouter = (props) => {
  return (
    <>
      <Switch>
        <Route path={ROUTE.LIBRARY}>
          <LibraryScene />
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
