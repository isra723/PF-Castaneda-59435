import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../features/dashboard/users/models";


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth Alumn': props<{ alumn: User }>(),
        'Unset Auth Alumn': emptyProps()
    }
})
