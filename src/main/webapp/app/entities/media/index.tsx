import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Media from './media';
import MediaDetail from './media-detail';
import MediaUpdate from './media-update';
import MediaDeleteDialog from './media-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MediaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MediaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MediaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MediaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Media} />
    </Switch>
  </>
);

export default Routes;
