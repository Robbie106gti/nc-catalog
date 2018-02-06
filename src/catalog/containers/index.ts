// import component from ''
import { CategoriesComponent } from './categories/categories.component';
import { CabViewComponent } from './cab-view/cab-view.component';
import { CatViewComponent } from './cat-view/cat-view.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { SpecCabComponent } from './spec-cab/spec-cab.component';
import { SpecCatComponent } from './spec-cat/spec-cat.component';

export const containers: any[] = [
    CategoriesComponent, CabViewComponent, CatViewComponent, ItemViewComponent, LoginViewComponent, SpecCabComponent, SpecCatComponent
];

// export * from ''
export * from './categories/categories.component';
export * from './cab-view/cab-view.component';
export * from './cat-view/cat-view.component';
export * from './item-view/item-view.component';
export * from './login-view/login-view.component';
export * from './spec-cab/spec-cab.component';
export * from './spec-cat/spec-cat.component';
