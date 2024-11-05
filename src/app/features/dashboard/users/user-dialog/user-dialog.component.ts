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
  passwordInputType: 'password' | 'text' = 'password'
  selected: "ADMIN" | "STUDENT" = "ADMIN"

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
      password: [null, [Validators.required]],
      role: [null,[Validators.required]]
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
        id: this.data?.editingUser ? this.data?.editingUser.id :generateRandomString(4),
        datecreated: this.data?.editingUser ? this.data?.editingUser.datecreated : new Date()
      })
    }
    
  }

  togglePasswordImputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }
}
