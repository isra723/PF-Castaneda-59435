import { createReducer, on } from "@ngrx/store";
import { User } from "../../features/dashboard/users/models";
import { AuthActions } from "../actions/auth.actions";

export const authFeatureName = 'auth'

export interface AuthState{
    authAlumn: User | null
}

const initialState: AuthState ={
    authAlumn: null
}

export const authReducer = createReducer(
    initialState,
    
    on(AuthActions.setAuthAlumn, (state, action) => {
        return {
            ...state,
            authAlumn: action.alumn
        }
    }),
    on(AuthActions.unsetAuthAlumn, (state) => {
        return {
            ...state,
            authAlumn: null,
        }
    })
)