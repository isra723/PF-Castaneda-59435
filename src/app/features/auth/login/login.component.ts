import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordInputType: 'password' | 'text' = 'password'

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  togglePasswordImputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text'
    } else {
      this.passwordInputType = 'password'
    }
  }

  onSubmit(): void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()

    }else{
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['dashboard', 'home'])
        },
        error: (err) => {
          console.error(err)
          if(err instanceof Error){
            alert(err.message)
          }

          if(err instanceof HttpErrorResponse){
            if(err.status === 0){
              alert("No se pudo conectar con el servidor")
            }

            //error para cada error de estado http
          }


        }

      })
    }
    
  }
}
