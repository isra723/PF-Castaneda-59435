import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureName, AuthState } from "../reducers/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName)

export const selectAuthAlumn = createSelector(
    selectAuthState,
    (state) => state.authAlumn
)