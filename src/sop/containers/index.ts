import { MainComponent } from './main/main.component';
import { SopComponent } from './sop/sop.component';
import { NewComponent } from './new/new.component';
import { SubComponent } from './sub/sub.component';
import { SearchComponent } from './search/search.component';
import { SopAutofocusDirective } from './search/sopAutoFocus.directive';
import { SopSpinnerComponent } from './spinner/spinner.component';
import { SopResultsComponent } from './search/results/results.component';

export const containers: any[] = [
  MainComponent,
  SopComponent,
  NewComponent,
  SubComponent,
  SearchComponent,
  SopAutofocusDirective,
  SopSpinnerComponent,
  SopResultsComponent
];

// export * from ''
export * from './main/main.component';
export * from './sop/sop.component';
export * from './new/new.component';
export * from './sub/sub.component';
export * from './search/search.component';
export * from './search/sopAutoFocus.directive';
export * from './spinner/spinner.component';
export * from './search/results/results.component';
