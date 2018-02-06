// import component from ''
import { CategoryItemComponent } from './category-item/category-item.component';
import { ChipComponent } from './chip-item/chip-item.component';
import { CategoryViewComponent } from './category-item/category-view.component';
import { LoginItemComponent } from './login-item/login-item.component';
import { ToolItemComponent } from './tool-item/tool-item.component';
import { SpecContentComponent } from './spec-content/spec-content.component';
import { DescriptionComponent } from './description/description.component';

export const components: any[] = [
    CategoryItemComponent, CategoryViewComponent, ChipComponent, LoginItemComponent, ToolItemComponent, SpecContentComponent, 
    DescriptionComponent
];

// export * from ''
export *  from './category-item/category-item.component';
export * from './category-item/category-view.component';
export * from './chip-item/chip-item.component';
export * from './login-item/login-item.component';
export * from './tool-item/tool-item.component';
export * from './spec-content/spec-content.component';
export * from './description/description.component';
