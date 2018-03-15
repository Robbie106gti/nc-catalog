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

// guards
import * as fromGuards from './guards';

// pipes
// import * as fromPipes from './pipes';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [ fromGuards.CatGuard ],
    component: fromContainers.MainComponent,
  },
  {
    path: 'new',
    canActivate: [ fromGuards.CatGuard ],
    component: fromContainers.NewComponent,
  },
  {
    path: ':Sop',
    canActivate: [ fromGuards.CatGuard, fromGuards.SopsGuard ],
    component: fromContainers.SubComponent,
  },
  {
    path: ':Sop/:Item',
    canActivate: [ fromGuards.CatGuard, fromGuards.SopsGuard ],
    component: fromContainers.SopComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('sops', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards ],
  declarations: [...fromContainers.containers, ...fromComponents.components ],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class SopModule {}
