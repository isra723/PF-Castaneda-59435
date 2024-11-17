import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIns from './ins.reducer';

export const selectInsState = createFeatureSelector<fromIns.State>(
  fromIns.insFeatureKey

);

export const selectInscripts = createSelector(
  selectInsState,
  (state) => state.inscrips
)

export const selectClassOption = createSelector(
  selectInsState,
  (state) => state.clasOpt
)

export const selectAlumnOption = createSelector(
  selectInsState,
  (state) => state.alumnOpt
)

export const slectInscripError = createSelector(
  selectInsState,
  (state) => state.loadInscripError
)