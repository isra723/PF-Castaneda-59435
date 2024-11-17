import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../core/services/users.service';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent implements OnInit {
  isLoading = false
  displayedColumns: string[] = ['id', 'name', 'email', 'date', 'actions'];
  dataSource: User[] = []
  authAlumn$: Observable<User | null>

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authAlumn$ = this.authService.authAlumn$
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users
      },
    })
}

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute })

  }

  deleteUser(id: string) {
    if (confirm('Seguro?')) {
      this.isLoading = true;
      this.usersService.removeUserById(id).subscribe({
        next: (users) => {
          this.dataSource = users;
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
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
            this.handleUpdate(editingUser.id, result);
          } else {
            this.usersService.createAlumn(result).subscribe({
              next: () => this.loadUsers()
            })
          }
        }
      }
    })
  }

  handleUpdate(id: string, update: User): void{
    this.isLoading = true
    this.usersService.updateUserById(id, update).subscribe({
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
