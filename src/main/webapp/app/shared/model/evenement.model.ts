import { IQuizz } from 'app/shared/model/quizz.model';

export interface IEvenement {
  id?: number;
  intitule?: string;
  quizzes?: IQuizz[];
}

export const defaultValue: Readonly<IEvenement> = {};
