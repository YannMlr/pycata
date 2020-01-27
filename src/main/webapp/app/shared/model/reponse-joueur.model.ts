import { IJoueur } from 'app/shared/model/joueur.model';
import { IReponsePossible } from 'app/shared/model/reponse-possible.model';

export interface IReponseJoueur {
  id?: number;
  dateEnvoi?: number;
  dateReponse?: number;
  score?: number;
  joueur?: IJoueur;
  reponsePossible?: IReponsePossible;
}

export const defaultValue: Readonly<IReponseJoueur> = {};
