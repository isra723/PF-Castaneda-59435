import { createFeature, createReducer, on } from '@ngrx/store';
import { InsActions } from './ins.actions';
import { Ins } from '../models';
import { Clase } from '../../clases/models';
import { User } from '../../users/models';
import { generateRandomString } from '../../../../shared/utils';
import { state } from '@angular/animations';

export const insFeatureKey = 'ins';

export interface State {
  isLoadingInsc: boolean
  loadInscripError: Error | null
  inscrips: Ins[]
  clasOpt: Clase[]
  alumnOpt: User[]
}

export const initialState: State = {
  isLoadingInsc: false,
  loadInscripError: null,
  inscrips: [],
  clasOpt: [],
  alumnOpt: []
};

export const reducer = createReducer(
  initialState,
  on(InsActions.loadInss, (state) => {
    return {
      ...state,
      isLoadingInsc: true
    }
  }),

  on(InsActions.loadInscripSucces, (state, action) => {
    return {
      ...state,
      inscrips: action.data,
      loadInscripError: null,
      isLoadingInsc: false
    }
  }),

  on(InsActions.loadInscripFailure , (state, action) => {
    return {
      ...state,
      ...initialState,
      loadInscripError: action.error,
      isLoadingInsc: false 
    }
  }),
  on(InsActions.loadInscAndAlumnOptions, (state) => {
    return {
      ...state,
      isLoadingInsc: true,

    }
  }),
  on(InsActions.loadInscAndAlumnOptionsSuccess, (state, action) => {
    return {
      ...state,
      loadInscripError: null,
      isLoadingInsc: false,
      clasOpt: action.clas,
      alumnOpt: action.alumn

    }
  }),
  on(InsActions.loadInscAndAlumnOptionsFailure, (state, {error}) => {
    return {
      ...state,
      loadInscripError: error,
      isLoadingInsc: true,

    }
  }),
  
);

export const insFeature = createFeature({
  name: insFeatureKey,
  reducer,
});

