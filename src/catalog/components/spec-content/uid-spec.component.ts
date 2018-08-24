import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'uid-spec',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <li *ngIf="spec$ | async as spec">
      <b>{{spec?.title}}</b>: {{ spec?.content }}</li>
    `
})
export class UidSpecComponent implements OnInit {
  @Input()
  uid: any;
  @Input()
  where: any;
  spec$: Observable<any>;

  constructor(private firestore: fromServices.FirestoreService) {}
  ngOnInit() {
    this.spec$ = this.firestore.doc$(`/structure/helpers/${this.where}/${this.uid}`);
  }
}
