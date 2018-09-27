// import component from ''
import { LoginGuard } from './login.guard';
import { SopGuard } from './sop.guard';

export const guards: any[] = [LoginGuard, SopGuard];

// export * from ''
export * from './login.guard';
export * from './sop.guard';
