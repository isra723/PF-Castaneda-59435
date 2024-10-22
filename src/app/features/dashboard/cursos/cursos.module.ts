import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    CursosComponent,
    CursosDialogComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
  ],
  exports: [
    CursosComponent,
  ]
})
export class CursosModule { }
