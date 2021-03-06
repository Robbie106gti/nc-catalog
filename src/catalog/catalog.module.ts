import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// containers
import * as fromDirectives from './directives';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// pipes
import * as fromPipes from './pipes';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.CatalogGuard],
    component: fromContainers.CategoriesComponent
  },
  {
    path: 'new'
    // canActivate: [fromGuards.PizzasGuard],
    // component: fromContainers.ProductItemComponent,
  },
  {
    path: 'category/:Cat',
    canActivate: [fromGuards.CatalogGuard, fromGuards.CategoriesGuard],
    component: fromContainers.CatViewComponent
  },
  {
    path: 'category/:Cat/:Item',
    canActivate: [fromGuards.CatalogGuard, fromGuards.CategoriesGuard],
    component: fromContainers.SpecCatComponent
  },
  {
    path: 'category/:Cat/:Item/:Version',
    canActivate: [fromGuards.CatalogGuard, fromGuards.CategoriesGuard],
    component: fromContainers.CatVersionComponent
  },
  {
    path: 'cabinets/:Cat',
    canActivate: [fromGuards.CatalogGuard, fromGuards.CabinetsGuard],
    component: fromContainers.CabViewComponent
  },
  {
    path: 'cabinets/:Cat/:Item',
    canActivate: [fromGuards.CatalogGuard, fromGuards.CabinetsGuard],
    component: fromContainers.SpecCabComponent
  },
  {
    path: 'cabinets/:Cat/:Item/:Version',
    canActivate: [fromGuards.CatalogGuard, fromGuards.CabinetsGuard],
    component: fromContainers.SpecCabComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromPipes.pipes,
    ...fromDirectives.directives
  ],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class CatalogModule {}
