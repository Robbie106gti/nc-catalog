import { RouterEffects } from './router.effect';
import { LoginEffects } from './login.effect';
import { SearchEffects } from './search.effect';

export const effects: any[] = [ RouterEffects, LoginEffects, SearchEffects ];

export * from './router.effect';
export * from './login.effect';
export * from './search.effect';
