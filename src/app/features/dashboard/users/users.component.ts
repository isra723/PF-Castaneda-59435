import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'date', 'actions'];
  dataSource: User[] = []

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
    })
}

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute })
  }

  deleteUser(id: string) {
    this.dataSource = this.dataSource.filter((user) => user.id !== id)
  }

  openModal(editingUser?: User): void {
    this.matDialog.open(UserDialogComponent, {
      data: {
        editingUser
      }
    }).afterClosed().subscribe({
      next: (result) => {
        if (!!result) {
          if (editingUser) {
            this.dataSource = this.dataSource.map((user) => user.id === editingUser.id ? { ...user, ...result } : user)
          } else {
            this.dataSource = [...this.dataSource, result]
          }
        }
      }
    })
  }
}
