import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Theme from './theme';
import ThemeDetail from './theme-detail';
import ThemeUpdate from './theme-update';
import ThemeDeleteDialog from './theme-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ThemeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ThemeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ThemeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ThemeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Theme} />
    </Switch>
  </>
);

export default Routes;
