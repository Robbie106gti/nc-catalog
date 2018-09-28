import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'materialboxed'
})
export class MaterializeboxedDirective {
  @Input()
  id: string;

  constructor() {}
}
