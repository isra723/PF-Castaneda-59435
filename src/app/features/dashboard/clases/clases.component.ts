import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../../../core/services/clases.service';
import { Clase } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ClasesDialogComponent } from './clases-dialog/clases-dialog.component';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../users/models';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit {
  isLoading = false
  displayedColumns: string[] = ['id', 'name', 'horario', 'categoryId', 'actions']
  dataSource: Clase[] = []
  authAlumn$: Observable<User | null>

  constructor(
    private clasesService: ClasesService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.authAlumn$ = this.authService.authAlumn$
  }

  ngOnInit(): void {
    this.loadClase()
  }

  openModal(editingClase?: Clase): void {
    this.matDialog.open(ClasesDialogComponent, {
      data: {
        editingClase
      }
    }).afterClosed().subscribe({
      next: (result) => {
        if (!!result) {
          if (editingClase) {
            this.handleUpdate(editingClase.id, result)
          } else {
            this.clasesService.createClase(result).subscribe({
              next: () => this.loadClase()
            })
          }
        }
      }
    })
  }

  loadClase(): void {
    this.clasesService.getClases().subscribe({
      next: (clase) => {
        this.dataSource = clase
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteClase(id: string) {
    if (confirm('Seguro?')) {
      this.isLoading = true
      this.clasesService.removeClaseById(id).subscribe({
        next: (clase) => {
          this.dataSource = clase
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    }
  }

  handleUpdate(id: string, update: Clase): void{
    this.isLoading = true
    this.clasesService.updateClaseById(id, update).subscribe({
      next: (clases) => {
        this.dataSource = clases
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
