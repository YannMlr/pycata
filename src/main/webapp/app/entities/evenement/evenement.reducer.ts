import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEvenement, defaultValue } from 'app/shared/model/evenement.model';

export const ACTION_TYPES = {
  FETCH_EVENEMENT_LIST: 'evenement/FETCH_EVENEMENT_LIST',
  FETCH_EVENEMENT: 'evenement/FETCH_EVENEMENT',
  CREATE_EVENEMENT: 'evenement/CREATE_EVENEMENT',
  UPDATE_EVENEMENT: 'evenement/UPDATE_EVENEMENT',
  DELETE_EVENEMENT: 'evenement/DELETE_EVENEMENT',
  RESET: 'evenement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEvenement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EvenementState = Readonly<typeof initialState>;

// Reducer

export default (state: EvenementState = initialState, action): EvenementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_EVENEMENT):
    case REQUEST(ACTION_TYPES.DELETE_EVENEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENEMENT):
    case FAILURE(ACTION_TYPES.CREATE_EVENEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_EVENEMENT):
    case FAILURE(ACTION_TYPES.DELETE_EVENEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENEMENT):
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

const apiUrl = 'api/evenements';

// Actions

export const getEntities: ICrudGetAllAction<IEvenement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVENEMENT_LIST,
  payload: axios.get<IEvenement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEvenement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENEMENT,
    payload: axios.get<IEvenement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEvenement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEvenement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEvenement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENEMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
