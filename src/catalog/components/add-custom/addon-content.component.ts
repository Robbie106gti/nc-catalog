import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'addon-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <span *ngIf="addon$ | async as addon"><b>{{ addon.title}}</b> {{ addon.content }}</span>
  `
})
export class AddonContentComponent implements OnInit {
  @Input()
  uid: string;
  addon$: Observable<any>;
  constructor(private firestore: fromServices.FirestoreService) {}
  ngOnInit() {
    // console.log(this.uid);
    if (this.uid) {
      this.addon$ = this.firestore.doc$(`/structure/helpers/addons/${this.uid}`);
    }
  }
}
