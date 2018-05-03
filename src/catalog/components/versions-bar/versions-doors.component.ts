import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'versions-doors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="col s12 m12 card padding">
      <h5>Select material</h5>
      <div *ngFor="let version of content.materials">
        <div class="col s2 m1 card">
          <img class="responsive-img" [alt]="content.title" [src]="content.image"/>
          <p>{{ content.title | titlecase }} - {{ version | titlecase }}</p>
        </div>
      </div>
      <div *ngIf="user.roles.admin" class="col s2 m1 padding right"><i class="material-icons large">add</i></div>
    </div>
    `
})
export class VersionsDoorsrComponent {
  @Input() content: any;
  @Input() user: any;
  @Output() edit = new EventEmitter<any>();

  Edit(event) {
    this.edit.emit(event);
  }
}
