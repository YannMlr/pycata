import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Choix from 'app/modules/Choix/choix';
import ListQuizz from 'app/modules/ListQuizz/listQuizz'
import QuestionActuelle from "app/modules/QuestionActuelle/questionActuelle";

import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>
});

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <PrivateRoute path={'/questionActuelle/:id'} component={QuestionActuelle} hasAnyAuthorities={[AUTHORITIES.USER]}/>
      <PrivateRoute path={'/listQuizz'} component={ListQuizz} hasAnyAuthorities={[AUTHORITIES.USER]}/>
      <PrivateRoute path={'/choix/:id'} component={Choix} hasAnyAuthorities={[AUTHORITIES.USER]}/>
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <ErrorBoundaryRoute path="/" exact component={Home} />
      <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
