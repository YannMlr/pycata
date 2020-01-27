import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Quizz from './quizz';
import QuizzDetail from './quizz-detail';
import QuizzUpdate from './quizz-update';
import QuizzDeleteDialog from './quizz-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={QuizzDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuizzUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuizzUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuizzDetail} />
      <ErrorBoundaryRoute path={match.url} component={Quizz} />
    </Switch>
  </>
);

export default Routes;
