// import component from ''
import { CatalogGuard } from './catalog.guard';
import { BCCabinetsGuard } from './bccabinets.guard';
import { BCabinetsGuard } from './bcabinets.guard';

export const guards: any[] = [ CatalogGuard, BCCabinetsGuard, BCabinetsGuard ];

// export * from ''
export * from './catalog.guard';
export * from './bccabinets.guard';
export * from './bcabinets.guard';
