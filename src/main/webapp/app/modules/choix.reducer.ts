import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IQuizz, defaultValue } from 'app/shared/model/quizz.model';

export const ACTION_TYPES = {
  FETCH_QUIZZ_LIST: 'quizz/FETCH_QUIZZ_LIST',
  FETCH_QUIZZ: 'quizz/FETCH_QUIZZ',
  CREATE_QUIZZ: 'quizz/CREATE_QUIZZ',
  UPDATE_QUIZZ: 'quizz/UPDATE_QUIZZ',
  DELETE_QUIZZ: 'quizz/DELETE_QUIZZ',
  RESET: 'quizz/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuizz>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChoixState = Readonly<typeof initialState>;

// Reducer

export default (state: ChoixState = initialState, action): ChoixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUIZZ_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUIZZ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUIZZ):
    case REQUEST(ACTION_TYPES.UPDATE_QUIZZ):
    case REQUEST(ACTION_TYPES.DELETE_QUIZZ):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUIZZ_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUIZZ):
    case FAILURE(ACTION_TYPES.CREATE_QUIZZ):
    case FAILURE(ACTION_TYPES.UPDATE_QUIZZ):
    case FAILURE(ACTION_TYPES.DELETE_QUIZZ):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZZ_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUIZZ):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUIZZ):
    case SUCCESS(ACTION_TYPES.UPDATE_QUIZZ):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUIZZ):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/choix';

// Actions

export const getEntities: ICrudGetAllAction<IQuizz> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_QUIZZ_LIST,
  payload: axios.get<IQuizz>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IQuizz> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUIZZ,
    payload: axios.get<IQuizz>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuizz> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUIZZ,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuizz> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUIZZ,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuizz> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUIZZ,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
