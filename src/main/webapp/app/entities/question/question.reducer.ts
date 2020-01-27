import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IQuestion, defaultValue } from 'app/shared/model/question.model';

export const ACTION_TYPES = {
  FETCH_QUESTION_LIST: 'question/FETCH_QUESTION_LIST',
  FETCH_QUESTION: 'question/FETCH_QUESTION',
  CREATE_QUESTION: 'question/CREATE_QUESTION',
  UPDATE_QUESTION: 'question/UPDATE_QUESTION',
  DELETE_QUESTION: 'question/DELETE_QUESTION',
  RESET: 'question/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuestion>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type QuestionState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestionState = initialState, action): QuestionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUESTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUESTION):
    case REQUEST(ACTION_TYPES.UPDATE_QUESTION):
    case REQUEST(ACTION_TYPES.DELETE_QUESTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUESTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTION):
    case FAILURE(ACTION_TYPES.CREATE_QUESTION):
    case FAILURE(ACTION_TYPES.UPDATE_QUESTION):
    case FAILURE(ACTION_TYPES.DELETE_QUESTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUESTION):
    case SUCCESS(ACTION_TYPES.UPDATE_QUESTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUESTION):
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

const apiUrl = 'api/questions';

// Actions

export const getEntities: ICrudGetAllAction<IQuestion> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_QUESTION_LIST,
  payload: axios.get<IQuestion>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IQuestion> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTION,
    payload: axios.get<IQuestion>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuestion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUESTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuestion> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUESTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuestion> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUESTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
