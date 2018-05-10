// import component from ''
import { CategoriesComponent } from './categories/categories.component';
import { CabViewComponent } from './cab-view/cab-view.component';
import { CatViewComponent } from './cat-view/cat-view.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { SpecCabComponent } from './spec-cab/spec-cab.component';
import { SpecCatComponent } from './spec-cat/spec-cat.component';
import { FormCabComponent } from './spec-cab/form-cab.component';
import { OnOffComponent } from '../components/buttons/on-off.component';
import { DoorsComponent } from './doors/doors.component';
import { DoorMenuComponent } from './doors/door-menu.component';
import { ImageLightboxComponent } from './image-lightbox/image-lightbox.component';

export const containers: any[] = [
  CategoriesComponent,
  CabViewComponent,
  CatViewComponent,
  ItemViewComponent,
  SpecCabComponent,
  SpecCatComponent,
  FormCabComponent,
  OnOffComponent,
  DoorsComponent,
  DoorMenuComponent,
  ImageLightboxComponent
];

// export * from ''
export * from './categories/categories.component';
export * from './cab-view/cab-view.component';
export * from './cat-view/cat-view.component';
export * from './item-view/item-view.component';
export * from './spec-cab/spec-cab.component';
export * from './spec-cat/spec-cat.component';
export * from './spec-cab/form-cab.component';
export * from '../components/buttons/on-off.component';
export * from './doors/doors.component';
export * from './doors/door-menu.component';
export * from './image-lightbox/image-lightbox.component';
