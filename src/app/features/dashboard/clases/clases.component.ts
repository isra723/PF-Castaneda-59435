import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../../../core/services/clases.service';
import { Clase } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ClasesDialogComponent } from './clases-dialog/clases-dialog.component';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'horario', 'categoryId']
  dataSourse: Clase[] = []

  constructor(
     private clasesService: ClasesService, 
    private matDialog: MatDialog) {
  }
  
  ngOnInit(): void {
    this.loadClase()
  }

  openModal(editingClase?: Clase): void{
    this.matDialog.open(ClasesDialogComponent, {
      data: {
        editingClase
      }
    }).afterClosed().subscribe({
      next: (result) => {
        if(!!result){
          if(editingClase){
            this.dataSourse = this.dataSourse.map((clase) => clase.id === editingClase.id ? {...clase, ...result} : clase)
          }else{
            this.dataSourse = [...this.dataSourse, result]
          }
        }
      }
    })
  }
  loadClase(): void {
    this.clasesService.getClases().subscribe({
      next: (clase) => {
        this.dataSourse = clase
      }
    })
  }
}
