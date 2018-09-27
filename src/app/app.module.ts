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

import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
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
import { SliderComponent } from './shared/ui/slider.component';
import { HomeComponent } from './shared/ui/home.component';
import { ProfileComponent } from './shared/user/profile.component';
import { UsersComponent } from './shared/user/users.component';
import { UserComponent } from './shared/user/user.component';
import { SearchComponent } from './shared/search/search.component';
import { ResultsComponent } from './shared/search/results/results.component';
import { SpinnerComponent } from './shared/search/results/spinner.component';
import { OnOffComponent } from './shared/buttons/onOff.component';

// services
import * as fromServices from './services';
// guards
import * as fromGuards from './guards';

// directives
import { AutofocusDirective } from './shared/search/autofocus.directive';
import { LoginComponent } from './shared/login/login.component';

// this would be done dynamically with webpack for builds
const env = {
  development: true,
  production: false
};

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [fromGuards.LoginGuard]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [fromGuards.LoginGuard],
    children: [
      { path: 'catalog', loadChildren: '../catalog/catalog.module#CatalogModule', canActivate: [fromGuards.CatGuard] },
      { path: 'sop', loadChildren: '../sop/sop.module#SopModule', canActivate: [fromGuards.SopGuard] },
      { path: 'mds', loadChildren: '../mds/mds.module#MdsModule', canActivate: [fromGuards.MdsGuard] }
    ]
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [fromGuards.LoginGuard]
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [fromGuards.LoginGuard, fromGuards.UsersGuard]
  },
  {
    path: 'search',
    pathMatch: 'full',
    component: SearchComponent,
    canActivate: [fromGuards.LoginGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [fromGuards.UserGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    ProfileComponent,
    UsersComponent,
    UserComponent,
    SearchComponent,
    AutofocusDirective,
    ResultsComponent,
    SpinnerComponent,
    OnOffComponent,
    LoginComponent
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
  providers: [
    ...fromServices.services,
    ...fromGuards.guards,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
