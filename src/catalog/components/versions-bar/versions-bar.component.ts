import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'versions-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="col s12 m12 card padding"  [ngClass]="{'discontinued': content.active === false}">
      <h5>Select height</h5>
      <div *ngFor="let version of content.heights">
        <image-bar [version]="version" [content]="content"></image-bar>
      </div>
    </div>
    `
})
export class VersionsBarComponent {
  @Input()
  content: any;
}
