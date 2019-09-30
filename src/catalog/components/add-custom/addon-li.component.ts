import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'addon-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <span *ngIf="addon$ | async as addon"><i class="material-icons">{{ addon.icon }}</i>{{ addon.title }}</span>
  `
})
export class AddonLiComponent implements OnInit {
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
