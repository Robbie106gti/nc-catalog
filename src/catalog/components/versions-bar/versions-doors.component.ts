import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'versions-doors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="col s12 m12 card padding no-print">
    <h5>Select material</h5>
    <div *ngIf="user.roles.admin" class="right no-print">
      <i class="material-icons">add</i>
    </div>
    <div *ngFor="let version of content.materials">
      <a [routerLink]="['./']" [queryParams]="{ mat: version }">
        <div class="col s3 m2 l1 card padding">
          <div class="card-image waves-effect waves-block waves-light imgh">
            <img *ngIf="content.images[version]; else Default" class="responsive-img" [alt]="content.images[version].title" [src]="content.images[version].image"
            />
          </div>
          <div class="card-content conth">
            <span class="card-title activator grey-text text-darken-4">{{ content.title | titlecase }}</span>
            <p>{{ version | titlecase }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>


    <ng-template #Default>
      <img class="responsive-img" [alt]="content.title" [src]="content.image"/>
    </ng-template>
    `,
  styles: [
    `
      .imgh {
        max-height: 5rem !important;
        overflow: hidden;
      }
      .conth {
        padding-top: 0.5rem !important;
        padding-left: 1% !important;
      }
      .card {
        margin-right: 0.5rem !important;
      }
      `
  ]
})
export class VersionsDoorsrComponent {
  @Input() content: any;
  @Input() user: any;
  @Output() edit = new EventEmitter<any>();
  image: string;
  Edit(event) {
    this.edit.emit(event);
  }
}
