import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'versions-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="col s12 m12 card padding">
      <h5>Select height</h5>
      <div *ngFor="let version of content.heights">
        <image-bar [version]="version" [content]="content" [user]="user" (edit)="Edit($event)"></image-bar>
      </div>
      <div *ngIf="user.roles.admin" class="col s2 m1 padding right"><i class="material-icons large">add</i></div>
    </div>
    `,
  })
  export class VersionsBarComponent {
    @Input() content: any;
    @Input() user: any;
    @Output() edit = new EventEmitter<any>();

    Edit(event) { this.edit.emit(event); }

  }
