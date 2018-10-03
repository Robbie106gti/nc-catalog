import { Directive, HostListener, Input, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
declare var M: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'materialboxed'
})
export class MaterializeboxedDirective implements AfterViewInit {
  @ViewChildren('materialboxed', { read: ElementRef })
  elemsMaterialboxed: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    const elems = this.elemsMaterialboxed;
    elems.forEach(el => {
      const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
    });
  }
}
