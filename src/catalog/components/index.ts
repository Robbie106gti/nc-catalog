// import component from ''
import { CategoryItemComponent } from './category-item/category-item.component';
import { ChipComponent } from './chip-item/chip-item.component';
import { CategoryViewComponent } from './category-item/category-view.component';

export const components: any[] = [ CategoryItemComponent, CategoryViewComponent, ChipComponent ];

// export * from ''
export *  from './category-item/category-item.component';
export * from './category-item/category-view.component';
export * from './chip-item/chip-item.component';
