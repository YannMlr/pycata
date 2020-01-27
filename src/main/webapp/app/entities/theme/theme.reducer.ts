import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITheme, defaultValue } from 'app/shared/model/theme.model';

export const ACTION_TYPES = {
  FETCH_THEME_LIST: 'theme/FETCH_THEME_LIST',
  FETCH_THEME: 'theme/FETCH_THEME',
  CREATE_THEME: 'theme/CREATE_THEME',
  UPDATE_THEME: 'theme/UPDATE_THEME',
  DELETE_THEME: 'theme/DELETE_THEME',
  RESET: 'theme/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITheme>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ThemeState = Readonly<typeof initialState>;

// Reducer

export default (state: ThemeState = initialState, action): ThemeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_THEME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THEME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THEME):
    case REQUEST(ACTION_TYPES.UPDATE_THEME):
    case REQUEST(ACTION_TYPES.DELETE_THEME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_THEME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THEME):
    case FAILURE(ACTION_TYPES.CREATE_THEME):
    case FAILURE(ACTION_TYPES.UPDATE_THEME):
    case FAILURE(ACTION_TYPES.DELETE_THEME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_THEME_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THEME):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THEME):
    case SUCCESS(ACTION_TYPES.UPDATE_THEME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THEME):
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

const apiUrl = 'api/themes';

// Actions

export const getEntities: ICrudGetAllAction<ITheme> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THEME_LIST,
  payload: axios.get<ITheme>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITheme> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THEME,
    payload: axios.get<ITheme>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITheme> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THEME,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITheme> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THEME,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITheme> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THEME,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
