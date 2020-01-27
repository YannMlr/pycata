import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Question from './question';
import QuestionDetail from './question-detail';
import QuestionUpdate from './question-update';
import QuestionDeleteDialog from './question-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={QuestionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Question} />
    </Switch>
  </>
);

export default Routes;
