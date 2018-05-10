import { Component, ChangeDetectionStrategy } from '@angular/core';

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
  images: any;
  modal$: Observable<boolean>;
  slide: number;
  total: number;
  constructor(private store: Store<fromStore.ProductsState>) {
    this.store
      .select(fromStore.getSelectedCatImagesItem)
      .take(1)
      .subscribe(images => {
        this.total = images.array.length;
        this.images = images;
      });
    this.modal$ = this.store.select(fromStore.getModalState);
    this.slide = 0;
  }

  UpdateModal(modal) {
    this.store.dispatch({ type: fromStore.MODAL, payload: modal });
  }
  SetSlide(slide) {
    this.slide = slide;
  }
  UpdateSlide(slide) {
    slide = this.slide + slide;
    if (this.total === slide) slide = 0;
    if (slide < 0) slide = this.total - 1;
    this.slide = slide;
  }
}
