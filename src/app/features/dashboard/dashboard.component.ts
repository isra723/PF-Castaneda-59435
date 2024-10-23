import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private router: Router){

  }
  
  logOut(): void {
    localStorage.removeItem('token')
    this.router.navigate(['auth', 'login'])
  }
  
}
