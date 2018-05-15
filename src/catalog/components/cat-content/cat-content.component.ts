import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cat-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="content.sub == 'Accessories'">
        <div class="card-panel grey lighten-3 bullet">
            <span class="card-title">
                <h4>Specifications</h4>
            </span>
            <div class="divider"></div>
            {{ content | json }}
        </div>
    </div>
    `
})
export class CatContentComponent {
  @Input() content: any;
  @Input() user: any;
}
