import { Component, Inject } from '@angular/core';
import { Clase } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClasesService } from '../../../../core/services/clases.service';
import { CourseService } from '../../../../core/services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../../cursos/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';

interface ClasesDialogData{
  editingClase?: Clase
}

@Component({
  selector: 'app-clases-dialog',
  templateUrl: './clases-dialog.component.html',
  styleUrl: './clases-dialog.component.scss'
})
export class ClasesDialogComponent {
  clases$: Observable<Clase[]>
  cursos$: Observable<Course[]> | undefined
  claseForm: FormGroup
  

  constructor(
    private matDialogRef: MatDialogRef<ClasesDialogData>,
    private clasesService: ClasesService, 
    private cursosService: CourseService, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: ClasesDialogData){
      this.cursos$ = this.cursosService.getCourses()
    this.clases$ = this.clasesService.getClases()
    this.claseForm = this.formBuilder.group({
    name: [],
    horario: [],
    categoryId: [],
  })
  this.fillDialogData()
  }

  fillDialogData(){
    if(this.data?.editingClase){
      this.claseForm.patchValue(this.data.editingClase)
    }
  }

  onSave(): void {
    if (this.claseForm.invalid) {
      this.claseForm.markAllAsTouched()
    } else {
      this.matDialogRef.close({
        ...this.claseForm.value,
        id: this.data?.editingClase ? this.data?.editingClase : generateRandomString(5),
      })
    }
  }
  
  
}
