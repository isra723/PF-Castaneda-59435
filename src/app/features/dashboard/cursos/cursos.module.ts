import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { SharedModule } from '../../../shared/shared.module';
import { CursoDialogComponent } from './curso-dialog/curso-dialog.component';


@NgModule({
  declarations: [
    CursosComponent,
    CursoDialogComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule
  ],
  exports: [
    CursosComponent,
  ]
})
export class CursosModule { }
