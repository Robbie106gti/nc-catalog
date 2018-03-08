import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreDevtools } from '@ngrx/store-devtools/src/devtools';

import { AppComponent } from './shared/app.component';
import { LoginFormComponent } from './shared/login/login-form.component';
import { HeaderComponent } from './shared/ui/header.component';
import { FooterComponent } from './shared/ui/footer.component';
import { HomeComponent } from './shared/ui/home.component';

// services
import * as fromServices from './services';
// guards
import * as fromGuards from './guards';

// this would be done dynamically with webpack for builds
const env = {
  development: true,
  production: false,
};

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'catalog',
    loadChildren: '../catalog/catalog.module#CatalogModule',
  },
  {
    path: 'sop',
    loadChildren: '../sop/sop.module#SopModule',
  },
  {
    path: 'mds',
    loadChildren: '../mds/mds.module#MdsModule',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    env.development ? StoreDevtoolsModule.instrument() : [],
    env.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [...fromServices.services, { provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
