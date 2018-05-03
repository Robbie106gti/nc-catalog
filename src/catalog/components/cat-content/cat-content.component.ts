import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cat-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <versions-doors class="row" [content]="content" [user]="user" (edit)="Edit($event)"></versions-doors>
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
    `
})
export class CatContentComponent {
  @Input() content: any;
  @Input() user: any;

  Edit(event) {
    console.log(event);
  }
}
