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
  isLoading = false
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
    if(confirm('Seguro?')){
      this.isLoading = true
      this.courseService.removeCourseById(id).subscribe({
        next: (course) => {
          this.dataSource = course;
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    }
  }

  openModal(editingCourse?: Course): void{
    this.matDialog.open(CursoDialogComponent, {
      data: {
        editingCourse
      }
    }).afterClosed().subscribe({
      next: (result) => {
        if(!!result){
          if(editingCourse){
            this.handleUpdate(editingCourse.id, result)
          }else {
            this.courseService.createCourse(result).subscribe({
              next: () => this.loadCourse()
            })
          }
        }
      }
    })
  }

  handleUpdate(id: string, update: Course): void{
    this.isLoading = true
    this.courseService.updateCourseById(id, update).subscribe({
      next: (alumns) => {
        this.dataSource = alumns
      },
      error: () => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }
}
