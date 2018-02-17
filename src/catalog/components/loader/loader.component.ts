import {
    Component,
    Input,
    ChangeDetectionStrategy
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'loader',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="progress">
        <div class="determinate" [style.width.%]="pct"></div>
    </div>`,
})
export class LoaderComponent {
  @Input() pct: number;

}
