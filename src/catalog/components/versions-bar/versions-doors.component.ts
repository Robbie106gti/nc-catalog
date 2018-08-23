import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { of } from '../../../../node_modules/rxjs/observable/of';

@Component({
  selector: 'versions-doors',
  template: `
<div class="col s12 m12 no-print card" [ngClass]="{'discontinued': content.active === false }">
  <div class="right no-print" *ngIf="(choices$ | async) as choices">
    <ul class="collection with-header" *ngIf="content.choices">
      <li class="collection-header">
        <h5>{{ content.choices.title | titlecase }}</h5>
      </li>
      <li class="collection-item" *ngIf="content.choices.wide" [ngClass]="{ 'active': choices.wr === 'true' && content.choices.wide.active, 'grey darken-1 white-text': !content.choices.wide.active }">
        <div *ngIf="choices.wr === 'true'">Wide Rail
          <a *ngIf="content.choices.wide.active" [routerLink]="['./']" [queryParams]="{ wr: false }" queryParamsHandling="merge" class="secondary-content white-text">
            <i class="material-icons">check_box</i>
          </a>
          <a *ngIf="!content.choices.wide.active" [routerLink]="['./']" [queryParams]="{ wr: true }" queryParamsHandling="merge" class="secondary-content white-text">
            <i class="material-icons">check_box</i>
          </a>
        </div>
        <div *ngIf="choices.wr ==='false'">Wide Rail
          <a [routerLink]="['./']" [queryParams]="{ wr: true }" queryParamsHandling="merge" class="secondary-content">
            <i class="material-icons">check_box_outline_blank</i>
          </a>
        </div>
      </li>
      <li class="collection-item" *ngIf="content.choices.pc1" [ngClass]="{ 'grey darken-1 white-text': !content.choices.pc1.active }">
        <div>1PC
          <a [routerLink]="['./']" [queryParams]="{ pc: 1 }" queryParamsHandling="merge" class="secondary-content" [ngClass]="{ 'white-text': !content.choices.pc1.active }">
            <i class="material-icons" *ngIf="choices.pc === '1'; else Unchecked">check_box</i>
          </a>
        </div>
      </li>
      <li class="collection-item" *ngIf="content.choices.pc2" [ngClass]="{ 'grey darken-1 white-text': !content.choices.pc2.active }">
        <div>2PC
          <a [routerLink]="['./']" [queryParams]="{ pc: 2 }" queryParamsHandling="merge" class="secondary-content" [ngClass]="{ 'white-text': !content.choices.pc2.active }">
            <i class="material-icons" *ngIf="choices.pc === '2'; else Unchecked">check_box</i>
          </a>
        </div>
      </li>
      <li class="collection-item" *ngIf="content.choices.pc5" [ngClass]="{ 'grey darken-1 white-text': !content.choices.pc5.active }">
        <div>5PC
          <a [routerLink]="['./']" [queryParams]="{ pc: 5 }" queryParamsHandling="merge" class="secondary-content" [ngClass]="{ 'white-text': !content.choices.pc5.active }">
            <i class="material-icons" *ngIf="choices.pc === '5'; else Unchecked">check_box</i>
          </a>
        </div>
      </li>
    </ul>
  </div>
  <h5>Select a material</h5>
  <div *ngFor="let version of content.materials">
    <a [routerLink]="['./']" [queryParams]="(setParamsMat(content, version))" queryParamsHandling="merge" (click)="setMat(version)">
      <div class="col s3 m2 l1 card padding" [ngClass]="{ 'brown lighten-5': mat == version }">
        <div class="card-image waves-effect waves-block waves-light imgh">
          <img *ngIf="content.images[version]; else Default" class="responsive-img" [alt]="content.images[version].title" [src]="content.images[version].image"
          />
        </div>
        <div class="card-content conth">
          <h6 class="activator grey-text text-darken-4">{{ version | titlecase }}</h6>
          <p class="grey-text">{{ content.title | titlecase }}</p>
        </div>
      </div>
    </a>
  </div>
</div>


<ng-template #Default>
  <img class="responsive-img" [alt]="content.title" [src]="content.image" />
</ng-template>
<ng-template #Unchecked>
  <i class="material-icons">check_box_outline_blank</i>
</ng-template>
    `,
  styles: [
    `
      .collection .collection-item.active {
        background-color: #26a69a !important;
      }
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
  @Input()
  content: any;
  @Input()
  user: any;
  @Output()
  edit = new EventEmitter<any>();
  mat: string;
  choices$: Observable<any>;

  constructor(private store: Store<fromStore.ProductsState>) {
    this.choices$ = this.store.select(fromStore.getRouterQueryParams);
  }
  Edit(event) {
    this.edit.emit(event);
  }
  setMat(mat) {
    this.mat = mat;
  }
  setParamsMat(content, version) {
    // console.log(content.matParams);
    if (content.matParams) return content.matParams[version];
    let matParams: { pc: number; mat: string };
    const pcs = { painted: 1, wood: 5 };
    if (content.choices) {
      pcs.painted = content.choices.pc1 ? 1 : pcs.painted;
      pcs.painted = content.choices.pc2 ? 2 : pcs.painted;
      pcs.wood = content.choices.pc5 ? 5 : pcs.painted;
      if (!content.choices.pc1 && !content.choices.pc2 && content.choices.pc5) pcs.painted = pcs.wood;
    }

    switch (version) {
      case 'painted':
        matParams = { pc: pcs.painted, mat: 'painted' };
        break;
      case 'wood':
        matParams = { pc: pcs.wood, mat: 'wood' };
        break;
      case 'melamine':
        matParams = { pc: pcs.painted, mat: 'melamine' };
        break;
      case 'engineered':
        matParams = { pc: pcs.painted, mat: 'engineered' };
        break;
      case 'euro materials':
        matParams = { pc: pcs.painted, mat: 'euro materials' };
        break;
      case 'gloss':
        matParams = { pc: pcs.painted, mat: 'gloss' };
        break;
    }
    return matParams;
  }
}
