import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'cat-content',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div *ngIf="content.sub != 'General Information'; else Info">
        <div class="card-panel grey lighten-3 bullet">
            <span class="card-title">
                <h4>Specifications</h4>
            </span>
            <div class="divider"></div>
            {{ content | json }}
        </div>
    </div>

    <ng-template #Info><gen-info [content]="content"></gen-info></ng-template>
    `,
  })
  export class CatContentComponent {
    @Input() content: any;
  }
