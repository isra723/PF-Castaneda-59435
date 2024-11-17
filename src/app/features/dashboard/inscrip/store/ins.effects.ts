import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { InsActions } from './ins.actions';
import { InscrpService } from '../../../../core/services/inscrip.service';
import { Action } from '@ngrx/store';
import { UsersService } from '../../../../core/services/users.service';
import { ClasesService } from '../../../../core/services/clases.service';

@Injectable()
export class InsEffects {


  loadInss$: Actions<Action<string>>
  crateInscrip$: Actions<Action<string>>
  createInscripSuccess$: Actions<Action<string>>
  loadInscAndAlumnOpt$: Actions<Action<string>>

  constructor(private actions$: Actions, private inscripService: InscrpService, private alumnService: UsersService, private clasService: ClasesService) {
    this.loadInss$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InsActions.loadInss),
        concatMap(() => this.inscripService.getInscript().pipe(
          map((response) => InsActions.loadInscripSucces({ data: response })),
          catchError((error) => of(InsActions.loadInscripFailure({ error })))
        ))
      );
    });

    this.crateInscrip$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InsActions.createInscr),
        concatMap((action) => this.inscripService.createInscrip({
          clasId: action.clasId,
          alumnId: action.alumnId
        }).pipe(
          map((data) => InsActions.createInscripSuccess({ data })),
          catchError((error) => of(InsActions.createInscripFailure({ error })))
        ))
      )
    })

    this.createInscripSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InsActions.createInscripSuccess),
        map(() => InsActions.loadInss())
      )
    })

    this.loadInscAndAlumnOpt$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InsActions.loadInscAndAlumnOptions),
        concatMap(() =>
          forkJoin([
            this.clasService.getClases(),
            this.alumnService.getUsers()
          ]).pipe(map((res) => InsActions.loadInscAndAlumnOptionsSuccess({
            clas: res[0],
            alumn: res[1]
          })
          ),
          catchError((error) => of(InsActions.loadInscAndAlumnOptionsFailure({ error })))
          )
        )
      )
    })
  }


}
