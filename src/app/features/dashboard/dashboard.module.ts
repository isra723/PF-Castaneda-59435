import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersModule } from './users/users.module';
import { SharedModule } from '../../shared/shared.module';
import { ClasesModule } from './clases/clases.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    UsersModule,
    SharedModule,
    ClasesModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}