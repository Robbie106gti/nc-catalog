import { CatalogEffects } from './catalog.effect';
import { CabinetsEffects } from './cabinets.effect';
import { CategoriesEffects } from './categories.effect';
import { LoginEffects } from './login.effect';
import { HelpersEffects } from './helpers.effect';
import { SearchEffects } from './search.effect';

export const effects: any[] = [CatalogEffects, CabinetsEffects,  CategoriesEffects, LoginEffects, HelpersEffects, SearchEffects ];

export * from './catalog.effect';
export * from './cabinets.effect';
export * from './categories.effect';
export * from './login.effect';
export * from './helpers.effect';
export * from './search.effect';
