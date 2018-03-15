// import component from ''
import { CatGuard } from './cat.guard';
import { SopsGuard } from './sops.guard';

export const guards: any[] = [ CatGuard, SopsGuard ];

// export * from ''
export * from './cat.guard';
export * from './sops.guard';
