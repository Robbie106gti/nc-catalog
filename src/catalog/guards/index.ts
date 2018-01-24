// import component from ''
import { CatalogGuard } from './catalog.guard';
import { CabinetsGuard } from './cabinets.guard';

export const guards: any[] = [ CatalogGuard, CabinetsGuard ];

// export * from ''
export * from './catalog.guard';
export * from './cabinets.guard';
