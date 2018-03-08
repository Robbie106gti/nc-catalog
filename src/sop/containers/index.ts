import { MainComponent } from './main/main.component';
import { SopComponent } from './sop/sop.component';
import { NewComponent } from './new/new.component';

export const containers: any[] = [
    MainComponent, SopComponent, NewComponent
];

// export * from ''
export *  from './main/main.component';
export *  from './sop/sop.component';
export *  from './new/new.component';
