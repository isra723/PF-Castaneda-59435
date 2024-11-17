import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripRoutingModule } from './inscrip-routing.module';
import { InscripComponent } from './inscrip.component';
import { StoreModule } from '@ngrx/store';
import { insFeature } from './store/ins.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InsEffects } from './store/ins.effects';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    InscripComponent,
  ],
  imports: [
    CommonModule,
    InscripRoutingModule,
    StoreModule.forFeature(insFeature),
    EffectsModule.forFeature([InsEffects]),
    SharedModule
  ]
})
export class InscripModule { }
