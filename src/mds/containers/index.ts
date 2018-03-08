import { MainComponent } from './main/main.component';
import { MdsComponent } from './mds/mds.component';
import { NewComponent } from './new/new.component';

export const containers: any[] = [
    MainComponent, MdsComponent, NewComponent
];

// export * from ''
export *  from './main/main.component';
export *  from './mds/mds.component';
export *  from './new/new.component';
