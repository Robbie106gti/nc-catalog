import { CatalogEffects } from './catalog.effect';
import { CabinetsEffects } from './cabinets.effect';
import { CategoriesEffects } from './categories.effect';
import { HelpersEffects } from './helpers.effect';
import { SearchEffects } from './search.effect';
import { EditEffects } from './edit.effect';

export const effects: any[] = [
  CatalogEffects,
  CabinetsEffects,
  CategoriesEffects,
  HelpersEffects,
  SearchEffects,
  EditEffects
];

export * from './catalog.effect';
export * from './cabinets.effect';
export * from './categories.effect';
export * from './helpers.effect';
export * from './search.effect';
export * from './edit.effect';
