import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InsActions } from './store/ins.actions';
import { Observable } from 'rxjs';
import { Ins } from './models';
import { selectAlumnOption, selectClassOption, selectInscripts, slectInscripError } from './store/ins.selectors';
import { User } from '../users/models';
import { Clase } from '../clases/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscrpService } from '../../../core/services/inscrip.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-inscrip',
  templateUrl: './inscrip.component.html',
  styleUrl: './inscrip.component.scss'
})
export class InscripComponent implements OnInit {
  inscripts$: Observable<Ins[]>
  alumn$: Observable<User[]>
  class$: Observable<Clase[]>
  loadInscripError$: Observable<Error | null>
  dataSourse: Ins[] = []
  authAlumn$: Observable<User | null>

  isLoading = false
  inscripForm: FormGroup

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private inscripService: InscrpService,
    private authService: AuthService
  ) {
    this.inscripForm = this.formBuilder.group({
      clasId: [null, [Validators.required]],
      alumnId: [null, [Validators.required]]
    })
    this.inscripts$ = store.select(selectInscripts)
    this.class$ = store.select(selectClassOption)
    this.alumn$ = store.select(selectAlumnOption)
    this.loadInscripError$ = store.select(slectInscripError)
    this.authAlumn$ = this.authService.authAlumn$
  }

  ngOnInit(): void {
    this.store.dispatch(InsActions.loadInss())
    this.store.dispatch(InsActions.loadInscAndAlumnOptions())
  }

  onSubmit(): void {
    if (this.inscripForm.invalid) {
      this.inscripForm.markAllAsTouched()
    } else {
      this.store.dispatch(InsActions.createInscr(this.inscripForm.value))
      this.inscripForm.reset()
    }
  }

  deleteInscrip(id: string) {
    if (confirm('Seguro?')) {
      this.isLoading = true
      this.inscripService.removeInsById(id).subscribe({
        next: () => {
          this.store.dispatch(InsActions.loadInss())
          this.store.dispatch(InsActions.loadInscAndAlumnOptions())
        },
        error: (err) => {
          this.isLoading = false
          this.store.dispatch(InsActions.loadInscAndAlumnOptionsFailure(err))
        },
        complete: () => {
          this.isLoading = false
        }
      })

    }
  }

}
