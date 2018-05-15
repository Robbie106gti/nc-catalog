import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'image-lightbox',
  templateUrl: './image-lightbox.html',
  styleUrls: ['./image-lightbox.scss']
})
export class ImageLightboxComponent {
  @Input() images$: Observable<any>;
  @Input() modal$: Observable<boolean>;
  slide: number;
  total: number;
  constructor(private store: Store<fromStore.ProductsState>) {
    this.slide = 0;
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
