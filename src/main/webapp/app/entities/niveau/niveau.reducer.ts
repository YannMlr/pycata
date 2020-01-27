import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INiveau, defaultValue } from 'app/shared/model/niveau.model';

export const ACTION_TYPES = {
  FETCH_NIVEAU_LIST: 'niveau/FETCH_NIVEAU_LIST',
  FETCH_NIVEAU: 'niveau/FETCH_NIVEAU',
  CREATE_NIVEAU: 'niveau/CREATE_NIVEAU',
  UPDATE_NIVEAU: 'niveau/UPDATE_NIVEAU',
  DELETE_NIVEAU: 'niveau/DELETE_NIVEAU',
  RESET: 'niveau/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INiveau>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NiveauState = Readonly<typeof initialState>;

// Reducer

export default (state: NiveauState = initialState, action): NiveauState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NIVEAU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NIVEAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NIVEAU):
    case REQUEST(ACTION_TYPES.UPDATE_NIVEAU):
    case REQUEST(ACTION_TYPES.DELETE_NIVEAU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NIVEAU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NIVEAU):
    case FAILURE(ACTION_TYPES.CREATE_NIVEAU):
    case FAILURE(ACTION_TYPES.UPDATE_NIVEAU):
    case FAILURE(ACTION_TYPES.DELETE_NIVEAU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NIVEAU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NIVEAU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NIVEAU):
    case SUCCESS(ACTION_TYPES.UPDATE_NIVEAU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NIVEAU):
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

const apiUrl = 'api/niveaus';

// Actions

export const getEntities: ICrudGetAllAction<INiveau> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NIVEAU_LIST,
  payload: axios.get<INiveau>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INiveau> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NIVEAU,
    payload: axios.get<INiveau>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INiveau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NIVEAU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INiveau> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NIVEAU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INiveau> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NIVEAU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
