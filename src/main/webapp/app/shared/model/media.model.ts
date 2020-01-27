import { IQuestion } from 'app/shared/model/question.model';
import { IReponsePossible } from 'app/shared/model/reponse-possible.model';

export interface IMedia {
  id?: number;
  url?: string;
  nom?: string;
  type?: number;
  questions?: IQuestion[];
  reponsePossibles?: IReponsePossible[];
}

export const defaultValue: Readonly<IMedia> = {};
