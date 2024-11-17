import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripComponent } from './inscrip.component';

const routes: Routes = [
  {
    path: "", 
    component: InscripComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripRoutingModule { }
