import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Niveau from './niveau';
import NiveauDetail from './niveau-detail';
import NiveauUpdate from './niveau-update';
import NiveauDeleteDialog from './niveau-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NiveauDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NiveauUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NiveauUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NiveauDetail} />
      <ErrorBoundaryRoute path={match.url} component={Niveau} />
    </Switch>
  </>
);

export default Routes;
