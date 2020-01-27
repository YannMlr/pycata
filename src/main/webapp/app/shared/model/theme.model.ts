import { IQuestion } from 'app/shared/model/question.model';

export interface ITheme {
  id?: number;
  intitule?: string;
  questions?: IQuestion[];
}

export const defaultValue: Readonly<ITheme> = {};
