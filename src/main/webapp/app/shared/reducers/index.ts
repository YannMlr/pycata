import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import media, {
  MediaState
} from 'app/entities/media/media.reducer';
// prettier-ignore
import quizz, {
  QuizzState
} from 'app/entities/quizz/quizz.reducer';
// prettier-ignore
import evenement, {
  EvenementState
} from 'app/entities/evenement/evenement.reducer';
// prettier-ignore
import question, {
  QuestionState
} from 'app/entities/question/question.reducer';
// prettier-ignore
import reponseJoueur, {
  ReponseJoueurState
} from 'app/entities/reponse-joueur/reponse-joueur.reducer';
// prettier-ignore
import theme, {
  ThemeState
} from 'app/entities/theme/theme.reducer';
// prettier-ignore
import reponsePossible, {
  ReponsePossibleState
} from 'app/entities/reponse-possible/reponse-possible.reducer';
// prettier-ignore
import niveau, {
  NiveauState
} from 'app/entities/niveau/niveau.reducer';
// prettier-ignore
import joueur, {
  JoueurState
} from 'app/entities/joueur/joueur.reducer';
import choix, { ChoixState } from 'app/modules/choix.reducer';
import listQuizz, { ListQuizzState } from 'app/modules/ListQuizz/listQuizz.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly media: MediaState;
  readonly quizz: QuizzState;
  readonly evenement: EvenementState;
  readonly question: QuestionState;
  readonly reponseJoueur: ReponseJoueurState;
  readonly theme: ThemeState;
  readonly reponsePossible: ReponsePossibleState;
  readonly niveau: NiveauState;
  readonly joueur: JoueurState;
  readonly choix: ChoixState;
  readonly listQuizz: ListQuizzState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  media,
  quizz,
  evenement,
  question,
  reponseJoueur,
  theme,
  reponsePossible,
  niveau,
  joueur,
  choix,
  listQuizz,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
