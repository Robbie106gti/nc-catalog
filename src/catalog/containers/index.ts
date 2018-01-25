// import component from ''
import { CategoriesComponent } from './catagories/categories.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { LoginViewComponent } from './login-view/login-view.component';

export const containers: any[] = [ CategoriesComponent, ItemViewComponent, LoginViewComponent ];

// export * from ''
export * from './catagories/categories.component';
export * from './item-view/item-view.component';
export * from './login-view/login-view.component';
