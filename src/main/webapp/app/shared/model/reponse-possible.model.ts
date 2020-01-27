import { IReponseJoueur } from 'app/shared/model/reponse-joueur.model';
import { IQuestion } from 'app/shared/model/question.model';
import { IMedia } from 'app/shared/model/media.model';

export interface IReponsePossible {
  id?: number;
  intitule?: string;
  vrai?: boolean;
  reponseJoueurs?: IReponseJoueur[];
  question?: IQuestion;
  media?: IMedia;
}

export const defaultValue: Readonly<IReponsePossible> = {
  vrai: false
};
