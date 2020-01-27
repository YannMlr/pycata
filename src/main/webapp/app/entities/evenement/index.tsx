import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Evenement from './evenement';
import EvenementDetail from './evenement-detail';
import EvenementUpdate from './evenement-update';
import EvenementDeleteDialog from './evenement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EvenementDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EvenementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EvenementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EvenementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Evenement} />
    </Switch>
  </>
);

export default Routes;
