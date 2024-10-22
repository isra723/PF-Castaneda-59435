import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { Course } from '../models';

interface CourseDialogData {
  editingCourse?: Course,
}

@Component({
  selector: 'app-cursos-dialog',
  templateUrl: './cursos-dialog.component.html',
  styleUrl: './cursos-dialog.component.scss'
})
export class CursosDialogComponent {

courseForm: FormGroup

constructor(
  private matDialogRef: MatDialogRef<CursosDialogComponent>,
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) private data: CourseDialogData
){
  this.courseForm = this.formBuilder.group({
    courseName: [null, [Validators.required]],
    teacher: [null, [Validators.required]],
    email: [null, [Validators.required]],
  })
  this.fillDialogData()

}
  fillDialogData() {
    if(this.data?.editingCourse){
      this.courseForm.patchValue(this.data.editingCourse)
    }
  }

  onSave(): void{

    if(this.courseForm.invalid){
      this.courseForm.markAllAsTouched()
    }else{
      this.matDialogRef.close({
        ...this.courseForm.value,
        id: this.data?.editingCourse ? this.data?.editingCourse.id :generateRandomString(4),
        datecreated: this.data?.editingCourse ? this.data?.editingCourse.datecreated : new Date()
      })
    }
    
  }

}
