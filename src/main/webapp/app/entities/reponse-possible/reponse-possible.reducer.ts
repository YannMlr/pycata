import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReponsePossible, defaultValue } from 'app/shared/model/reponse-possible.model';

export const ACTION_TYPES = {
  FETCH_REPONSEPOSSIBLE_LIST: 'reponsePossible/FETCH_REPONSEPOSSIBLE_LIST',
  FETCH_REPONSEPOSSIBLE: 'reponsePossible/FETCH_REPONSEPOSSIBLE',
  CREATE_REPONSEPOSSIBLE: 'reponsePossible/CREATE_REPONSEPOSSIBLE',
  UPDATE_REPONSEPOSSIBLE: 'reponsePossible/UPDATE_REPONSEPOSSIBLE',
  DELETE_REPONSEPOSSIBLE: 'reponsePossible/DELETE_REPONSEPOSSIBLE',
  RESET: 'reponsePossible/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReponsePossible>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ReponsePossibleState = Readonly<typeof initialState>;

// Reducer

export default (state: ReponsePossibleState = initialState, action): ReponsePossibleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REPONSEPOSSIBLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REPONSEPOSSIBLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REPONSEPOSSIBLE):
    case REQUEST(ACTION_TYPES.UPDATE_REPONSEPOSSIBLE):
    case REQUEST(ACTION_TYPES.DELETE_REPONSEPOSSIBLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REPONSEPOSSIBLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REPONSEPOSSIBLE):
    case FAILURE(ACTION_TYPES.CREATE_REPONSEPOSSIBLE):
    case FAILURE(ACTION_TYPES.UPDATE_REPONSEPOSSIBLE):
    case FAILURE(ACTION_TYPES.DELETE_REPONSEPOSSIBLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPONSEPOSSIBLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPONSEPOSSIBLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REPONSEPOSSIBLE):
    case SUCCESS(ACTION_TYPES.UPDATE_REPONSEPOSSIBLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REPONSEPOSSIBLE):
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

const apiUrl = 'api/reponse-possibles';

// Actions

export const getEntities: ICrudGetAllAction<IReponsePossible> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REPONSEPOSSIBLE_LIST,
  payload: axios.get<IReponsePossible>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IReponsePossible> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REPONSEPOSSIBLE,
    payload: axios.get<IReponsePossible>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReponsePossible> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REPONSEPOSSIBLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReponsePossible> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REPONSEPOSSIBLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReponsePossible> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REPONSEPOSSIBLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
