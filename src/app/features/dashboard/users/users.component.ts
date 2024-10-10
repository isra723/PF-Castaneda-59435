import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';




const USER_DATA: User[] = [
  {
    id: "salkdu",
    firstName: "jose",
    lastName: "israel",
    email: "israel@gmail.com",
    datecreated: new Date
  },
  
]
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent {

  displayedColumns: string[] = ['id', 'name', 'email' ,'date', 'actions'];
  dataSource = USER_DATA;

  usuario = {
    nombre: 'Israel', 
    apellido: 'Piña'
  }

  constructor(private matDialog: MatDialog){

  }


  deleteUser(id: string){
    this.dataSource = this.dataSource.filter((user) => user.id !== id)
  }

  openModal(editingUser?: User): void{
    this.matDialog.open(UserDialogComponent, {
      data: {
        editingUser
      }
  }).afterClosed().subscribe({
      next: (result) => {
        console.log("Recibido", result)

        if(!!result){
          this.dataSource = [...this.dataSource, result]
        }
      }
    })
  }
}
