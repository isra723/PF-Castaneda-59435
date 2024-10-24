import { Component, OnInit } from '@angular/core';
import { Course } from './models';
import { CourseService } from '../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoDialogComponent } from './curso-dialog/curso-dialog.component';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'date', 'actions']
  dataSource: Course[] = []

  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){
  }
  ngOnInit(): void {
    this.loadCourse()
  }

  loadCourse(): void{
    this.courseService.getCourses().subscribe({
      next: (course) => {
        this.dataSource = course
      },
    })
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute })
  }  

  deleteUser(id: string){
    this.dataSource = this.dataSource.filter((course) => course.id !== id)
  }

  openModal(editingCourse?: Course): void{
    this.matDialog.open(CursoDialogComponent, {
      data: {
        editingCourse
      }
    }).afterClosed().subscribe({
      next: (result) => {
        console.log("Recibido", this.dataSource)
        if(!!result){
          if(editingCourse){
            this.dataSource = this.dataSource.map((course) => course.id === editingCourse.id ? {...course, ...result} : course)
          }else {
            this.dataSource = [...this.dataSource, result]
          }
        }
      }
    })
  }
}
