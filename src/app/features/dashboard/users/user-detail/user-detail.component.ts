import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  idUsuario?: string
  user?: User


  constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService){
    this.idUsuario = activatedRoute.snapshot.params['id']
  }
  ngOnInit(): void {
    this.usersService.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => {
        this.user = user
      }
    })
  }
}
