import { IQuestion } from 'app/shared/model/question.model';

export interface INiveau {
  id?: number;
  intitule?: string;
  questions?: IQuestion[];
}

export const defaultValue: Readonly<INiveau> = {};
