import { IReponseJoueur } from 'app/shared/model/reponse-joueur.model';

export interface IJoueur {
  id?: number;
  idUser?: number;
  reponseJoueurs?: IReponseJoueur[];
}

export const defaultValue: Readonly<IJoueur> = {};
