import { IQuestion } from 'app/shared/model/question.model';
import { IEvenement } from 'app/shared/model/evenement.model';

export interface IQuizz {
  id?: number;
  sujet?: string;
  score?: number;
  questions?: IQuestion[];
  evenement?: IEvenement;
}

export const defaultValue: Readonly<IQuizz> = {};
