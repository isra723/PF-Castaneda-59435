import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  mostrar: boolean = false
  toggleLabel(){
    this.mostrar = !this.mostrar
  }
}
