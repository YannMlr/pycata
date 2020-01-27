import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Media from './media';
import Quizz from './quizz';
import Evenement from './evenement';
import Question from './question';
import ReponseJoueur from './reponse-joueur';
import Theme from './theme';
import ReponsePossible from './reponse-possible';
import Niveau from './niveau';
import Joueur from './joueur';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}media`} component={Media} />
      <ErrorBoundaryRoute path={`${match.url}quizz`} component={Quizz} />
      <ErrorBoundaryRoute path={`${match.url}evenement`} component={Evenement} />
      <ErrorBoundaryRoute path={`${match.url}question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}reponse-joueur`} component={ReponseJoueur} />
      <ErrorBoundaryRoute path={`${match.url}theme`} component={Theme} />
      <ErrorBoundaryRoute path={`${match.url}reponse-possible`} component={ReponsePossible} />
      <ErrorBoundaryRoute path={`${match.url}niveau`} component={Niveau} />
      <ErrorBoundaryRoute path={`${match.url}joueur`} component={Joueur} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
