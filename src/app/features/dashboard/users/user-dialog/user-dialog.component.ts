import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { User } from '../models';

interface UserDialogData {
  editingUser?: User,
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {

userForm: FormGroup

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: UserDialogData
  ){


    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
    })
    this.fillDialogData()
  }

  fillDialogData(){
    if(this.data?.editingUser){
      this.userForm.patchValue(this.data.editingUser)
    }
  }

  onSave(): void{

    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
    }else{
      this.matDialogRef.close({
        ...this.userForm.value,
        id: generateRandomString(4),
        datecreated: new Date()
      })
    }
    
  }
}
