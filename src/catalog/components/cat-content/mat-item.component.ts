import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mat-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="card">
    <div class="card-image">
      <img [src]="mat.image">
      <span class="card-title" [ngClass]="{ 'brown-text text-darken-4': mat.darken }">{{ mat.title }}
      <br><small class="sub-title"><i>{{ mat.material | titlecase }}<span *ngIf="mat['sub-material']"> - {{ mat['sub-material'] | titlecase }}</span></i></small></span>
    </div>
    <div class="card-content">
      <ul *ngIf="mat.properties">
        <li><b>Exterior Material</b>: <switch-mat [active]="mat.properties.exterior"></switch-mat><li>
        <li><b>Interior Material</b>: <switch-mat [active]="mat.properties.interior"></switch-mat><li>
        <li *ngIf="mat.properties.interior"><b>3/4"</b>: <switch-mat [active]="mat.properties.i34"></switch-mat><li>
        <li *ngIf="mat.properties.interior"><b>5/8"</b>: <switch-mat [active]="mat.properties.i58"></switch-mat><li>
      </ul>
      <ul *ngIf="mat.canitbe">
        <li><b>Color Options</b>: <switch-mat [active]="mat.canitbe.color"></switch-mat><li>
        <li *ngIf="mat.canitbe.color"><b>Stains</b>: <switch-mat [active]="mat.canitbe.stain"></switch-mat><li>
        <li *ngIf="mat.canitbe.color"><b>Sheen</b>: <switch-mat [active]="mat.canitbe.sheen"></switch-mat><li>
        <li *ngIf="mat.canitbe.color"><b>Special Finish</b>: <switch-mat [active]="mat.canitbe['special-finish']"></switch-mat><li>
      </ul>
      <span class="grey-text right"><small><i>{{ mat.id }}</i></small></span>
    </div>
  </div>
    `,
  styles: [
    `
      img {
        max-width: 100%;
      }
      .card-image {
        max-height: 120px;
        overflow: hidden;
      }
      .card-title {
        line-height: 1 !important;
        font-weight: 450;
      }
      .sub-title {
        font-size: 10pt;
      }
    `
  ]
})
export class MatItemComponent {
  @Input() mat: any;
}
