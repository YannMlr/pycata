import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJoueur, defaultValue } from 'app/shared/model/joueur.model';

export const ACTION_TYPES = {
  FETCH_JOUEUR_LIST: 'joueur/FETCH_JOUEUR_LIST',
  FETCH_JOUEUR: 'joueur/FETCH_JOUEUR',
  CREATE_JOUEUR: 'joueur/CREATE_JOUEUR',
  UPDATE_JOUEUR: 'joueur/UPDATE_JOUEUR',
  DELETE_JOUEUR: 'joueur/DELETE_JOUEUR',
  RESET: 'joueur/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJoueur>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type JoueurState = Readonly<typeof initialState>;

// Reducer

export default (state: JoueurState = initialState, action): JoueurState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOUEUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOUEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JOUEUR):
    case REQUEST(ACTION_TYPES.UPDATE_JOUEUR):
    case REQUEST(ACTION_TYPES.DELETE_JOUEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JOUEUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOUEUR):
    case FAILURE(ACTION_TYPES.CREATE_JOUEUR):
    case FAILURE(ACTION_TYPES.UPDATE_JOUEUR):
    case FAILURE(ACTION_TYPES.DELETE_JOUEUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOUEUR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOUEUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOUEUR):
    case SUCCESS(ACTION_TYPES.UPDATE_JOUEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOUEUR):
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

const apiUrl = 'api/joueurs';

// Actions

export const getEntities: ICrudGetAllAction<IJoueur> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JOUEUR_LIST,
  payload: axios.get<IJoueur>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IJoueur> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOUEUR,
    payload: axios.get<IJoueur>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJoueur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOUEUR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJoueur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOUEUR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJoueur> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOUEUR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
