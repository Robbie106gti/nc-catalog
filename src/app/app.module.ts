import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './shared/app.component';
import { HeaderComponent } from './shared/ui/header.component';
import { FooterComponent } from './shared/ui/footer.component';
import { HomeComponent } from './shared/ui/home.component';
import { StoreDevtools } from '@ngrx/store-devtools/src/devtools';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'catalog',
    loadChildren: '../catalog/catalog.module#CatalogModule',
  }
];

@NgModule({
  declarations: [
    AppComponent,
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
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
