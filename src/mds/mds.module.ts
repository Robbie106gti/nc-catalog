import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// pipes
// import * as fromPipes from './pipes';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.MainComponent,
  },
  {
    path: 'new',
    component: fromContainers.NewComponent,
  },
  {
    path: ':Mds',
    component: fromContainers.MdsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('mds', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services ],
  declarations: [...fromContainers.containers, ...fromComponents.components ],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class MdsModule {}
