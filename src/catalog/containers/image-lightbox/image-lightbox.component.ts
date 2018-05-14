import { Component, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'image-lightbox',
  templateUrl: './image-lightbox.html',
  styleUrls: ['./image-lightbox.scss']
})
export class ImageLightboxComponent implements OnChanges {
  images$: Observable<any>;
  modal$: Observable<boolean>;
  slide: number;
  total: number;
  router$: Observable<any>;
  constructor(private store: Store<fromStore.ProductsState>) {
    this.router$ = this.store.select(fromStore.getRouterQueryParams);
    this.Take1();
    this.modal$ = this.store.select(fromStore.getModalState);
    this.slide = 0;
  }

  Take1() {
    this.images$ = this.store.select(fromStore.getSelectedCatImagesItem).take(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes');
    if (changes['router$']) {
      console.log('hello');
      this.Take1();
    }
  }

  UpdateModal(modal) {
    this.store.dispatch({ type: fromStore.MODAL, payload: modal });
  }
  SetSlide(slide) {
    this.slide = slide;
  }
  UpdateSlide(slide, total) {
    slide = this.slide + slide;
    if (total === slide) slide = 0;
    if (slide < 0) slide = total - 1;
    this.slide = slide;
  }
}
