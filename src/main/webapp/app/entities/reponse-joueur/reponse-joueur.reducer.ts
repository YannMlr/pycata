import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReponseJoueur, defaultValue } from 'app/shared/model/reponse-joueur.model';

export const ACTION_TYPES = {
  FETCH_REPONSEJOUEUR_LIST: 'reponseJoueur/FETCH_REPONSEJOUEUR_LIST',
  FETCH_REPONSEJOUEUR: 'reponseJoueur/FETCH_REPONSEJOUEUR',
  CREATE_REPONSEJOUEUR: 'reponseJoueur/CREATE_REPONSEJOUEUR',
  UPDATE_REPONSEJOUEUR: 'reponseJoueur/UPDATE_REPONSEJOUEUR',
  DELETE_REPONSEJOUEUR: 'reponseJoueur/DELETE_REPONSEJOUEUR',
  RESET: 'reponseJoueur/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReponseJoueur>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ReponseJoueurState = Readonly<typeof initialState>;

// Reducer

export default (state: ReponseJoueurState = initialState, action): ReponseJoueurState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REPONSEJOUEUR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REPONSEJOUEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REPONSEJOUEUR):
    case REQUEST(ACTION_TYPES.UPDATE_REPONSEJOUEUR):
    case REQUEST(ACTION_TYPES.DELETE_REPONSEJOUEUR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REPONSEJOUEUR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REPONSEJOUEUR):
    case FAILURE(ACTION_TYPES.CREATE_REPONSEJOUEUR):
    case FAILURE(ACTION_TYPES.UPDATE_REPONSEJOUEUR):
    case FAILURE(ACTION_TYPES.DELETE_REPONSEJOUEUR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPONSEJOUEUR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPONSEJOUEUR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REPONSEJOUEUR):
    case SUCCESS(ACTION_TYPES.UPDATE_REPONSEJOUEUR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REPONSEJOUEUR):
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

const apiUrl = 'api/reponse-joueurs';

// Actions

export const getEntities: ICrudGetAllAction<IReponseJoueur> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REPONSEJOUEUR_LIST,
  payload: axios.get<IReponseJoueur>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IReponseJoueur> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REPONSEJOUEUR,
    payload: axios.get<IReponseJoueur>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IReponseJoueur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REPONSEJOUEUR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReponseJoueur> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REPONSEJOUEUR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReponseJoueur> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REPONSEJOUEUR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
