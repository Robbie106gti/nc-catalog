// import component from ''
import { CatalogGuard } from './catalog.guard';
import { CabinetsGuard } from './cabinets.guard';
import { CategoriesGuard } from './categories.guard';

export const guards: any[] = [ CatalogGuard, CabinetsGuard, CategoriesGuard ];

// export * from ''
export * from './catalog.guard';
export * from './cabinets.guard';
export * from './categories.guard';
