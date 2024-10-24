import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { UsersService } from '../../../../core/services/users.service';
import { Course } from '../../cursos/models';
import { CourseService } from '../../../../core/services/course.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  idUsuario?: string
  user?: User
  course?: Course
  
  courses: Course[] = []

  constructor(
    private activatedRoute: ActivatedRoute, 
    private usersService: UsersService, 
    private courseService: CourseService,)
    {
    this.idUsuario = activatedRoute.snapshot.params['id']
  }

  loadCourse(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses
      }
    })
  }

  ngOnInit(): void {
    this.usersService.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => {
        this.user = user
      }
    })
    this.loadCourse()
  }
}
