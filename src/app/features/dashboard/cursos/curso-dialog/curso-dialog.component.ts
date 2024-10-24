import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';

interface CourseDialogData{
  editingCourse?: Course
}

@Component({
  selector: 'app-curso-dialog',
  templateUrl: './curso-dialog.component.html',
  styleUrl: './curso-dialog.component.scss'
})
export class CursoDialogComponent {
  courseForm: FormGroup

  constructor(
    private matDialogRef: MatDialogRef<CourseDialogData>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: CourseDialogData
  ){
    this.courseForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    })
    this.fillDialogData()
  }

  fillDialogData(){
    if(this.data?.editingCourse){
      this.courseForm.patchValue(this.data.editingCourse)
    }
  }

  onSave(): void {
    if(this.courseForm.invalid){
      this.courseForm.markAllAsTouched()
    }else{
      this.matDialogRef.close({
        ...this.courseForm.value,
        id: this.data?.editingCourse ? this.data?.editingCourse.id : generateRandomString(4),
        datecreated: this.data?.editingCourse ? this.data?.editingCourse.datecreated : new Date()
      })
    }
  }
}
