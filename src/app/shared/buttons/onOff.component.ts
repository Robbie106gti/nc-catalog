import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'on-off',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="switch">
    <label>
      Off
      <input type="checkbox" [checked]="active" (click)="Update(active)">
      <span class="lever"></span>
      On
    </label>
  </div>
  `
})
export class OnOffComponent {
  @Input()
  active: any;
  @Output()
  offOn = new EventEmitter<any>();

  Update(active) {
    const off = active === true ? false : true;
    this.active = off;
    this.offOn.emit(off);
  }
}
