import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReponseJoueur from './reponse-joueur';
import ReponseJoueurDetail from './reponse-joueur-detail';
import ReponseJoueurUpdate from './reponse-joueur-update';
import ReponseJoueurDeleteDialog from './reponse-joueur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReponseJoueurDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReponseJoueurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReponseJoueurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReponseJoueurDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReponseJoueur} />
    </Switch>
  </>
);

export default Routes;
