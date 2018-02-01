import { CatalogEffects } from './catalog.effect';
import { CabinetsEffects } from './cabinets.effect';
import { CategoriesEffects } from './categories.effect';
import { LoginEffects } from './login.effect';

export const effects: any[] = [CatalogEffects, CabinetsEffects,  CategoriesEffects, LoginEffects];

export * from './catalog.effect';
export * from './cabinets.effect';
export * from './categories.effect';
export * from './login.effect';
