import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Ins } from '../models';
import { User } from '../../users/models';
import { Clase } from '../../clases/models';

export const InsActions = createActionGroup({
  source: 'Ins',
  events: {
    'Load Inss': emptyProps(),

    'Load Inscrip Succes': props<{data: Ins[]}>(),

    'Load Inscrip Failure': props<{error: Error }>(),

    'Create Inscr': props<{clasId: string; alumnId: string}>(),
    'Create Inscrip Success': props<{data: Ins}>(),
    'Create Inscrip Failure': props<{ error : Error}>(),
    
    'Load Insc And Alumn Options': emptyProps(),
    'Load Insc And Alumn Options Success': props<{alumn: User[], clas: Clase[]}>(),
    'Load Insc And Alumn Options Failure': props<{error: Error}>(),
  }
});
