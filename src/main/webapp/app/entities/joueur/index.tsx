import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Joueur from './joueur';
import JoueurDetail from './joueur-detail';
import JoueurUpdate from './joueur-update';
import JoueurDeleteDialog from './joueur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JoueurDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JoueurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JoueurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JoueurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Joueur} />
    </Switch>
  </>
);

export default Routes;
