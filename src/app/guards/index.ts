// import component from ''
import { LoginGuard } from './login.guard';
import { SopGuard } from './sop.guard';
import { CatGuard } from './cat.guard';
import { MdsGuard } from './mds.guard';
import { UsersGuard } from './users.guard';
import { UserGuard } from './user.guard';

export const guards: any[] = [LoginGuard, SopGuard, CatGuard, MdsGuard, UsersGuard, UserGuard];

// export * from ''
export * from './login.guard';
export * from './sop.guard';
export * from './cat.guard';
export * from './mds.guard';
export * from './users.guard';
export * from './user.guard';
