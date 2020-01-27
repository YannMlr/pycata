import { IReponsePossible } from 'app/shared/model/reponse-possible.model';
import { IQuizz } from 'app/shared/model/quizz.model';
import { ITheme } from 'app/shared/model/theme.model';
import { INiveau } from 'app/shared/model/niveau.model';
import { IMedia } from 'app/shared/model/media.model';

export interface IQuestion {
  id?: number;
  intitule?: string;
  reponsePossibles?: IReponsePossible[];
  quizz?: IQuizz;
  theme?: ITheme;
  niveau?: INiveau;
  media?: IMedia;
}

export const defaultValue: Readonly<IQuestion> = {};
