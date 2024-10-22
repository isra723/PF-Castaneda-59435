import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Course } from './models';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';

const COURSE_DATA: Course[] = [
  {
    id: "akdjfga",
    teacher: "jose",
    email: "israel@gmail.com",
    datecreated: new Date
  },
  
]

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  displayedColumns: string[] = ['id', 'name', 'email' ,'date', 'actions'];
  dataSource = COURSE_DATA;

  usuario = {
    nombre: 'Israel', 
    apellido: 'Piña'
  }

  constructor(private matDialog: MatDialog){

  }


  deleteUser(id: string){
    this.dataSource = this.dataSource.filter((course) => course.id !== id)
  }


  openModal(editingCourse?: Course): void{
    this.matDialog.open(CursosDialogComponent, {
      data: {
        editingCourse
      }
  }).afterClosed().subscribe({
      next: (result) => {
        console.log("Recibido", result)

        if(!!result){
          if(editingCourse){
            this.dataSource = this.dataSource.map((user) => user.id === editingCourse.id ? {...user, ...result} : user)
          }else{
            this.dataSource = [...this.dataSource, result]
          }
        }
      }
    })
  }
}
