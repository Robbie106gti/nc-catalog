import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cat-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <versions-doors *ngIf="content.doorstyle" class="row" [content]="content" [user]="user" (edit)="Edit($event)"></versions-doors>
    <div *ngIf="content.sub == 'Accessories'">
        <div class="card-panel grey lighten-3 bullet">
            <span class="card-title">
                <h4>Specifications</h4>
            </span>
            <div class="divider"></div>
            {{ content | json }}
        </div>
    </div>
    <gen-info *ngIf="content.sub == 'General Information'" [content]="content"></gen-info>
    <door-info *ngIf="content.sub == 'Doors'" [content]="content" [user]="user"></door-info>
    `
})
export class CatContentComponent {
  @Input() content: any;
  @Input() user: any;

  Edit(event) {
    console.log(event);
  }
}
