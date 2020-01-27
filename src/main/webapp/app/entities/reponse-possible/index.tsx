import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReponsePossible from './reponse-possible';
import ReponsePossibleDetail from './reponse-possible-detail';
import ReponsePossibleUpdate from './reponse-possible-update';
import ReponsePossibleDeleteDialog from './reponse-possible-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReponsePossibleDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReponsePossibleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReponsePossibleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReponsePossibleDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReponsePossible} />
    </Switch>
  </>
);

export default Routes;
