import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';
import { Iwhd } from '../../models/iwhd.model';

@Component({
  selector: 'uid-iwhd',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <li class="second" *ngIf="spec$ | async as spec"><i class="material-icons">tune</i> {{ spec.title }} - {{ spec.content }}</li>
    `
})
export class UidIwhdComponent implements OnInit {
  @Input()
  uid: any;
  @Input()
  where: any;
  spec$: Observable<Iwhd>;

  constructor(private firestore: fromServices.FirestoreService) {}
  ngOnInit() {
    if (this.uid && this.uid !== undefined) {
      this.spec$ = this.firestore.doc$(`/structure/helpers/${this.where}/${this.uid}`);
    }
  }
}
