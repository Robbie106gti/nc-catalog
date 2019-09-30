import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'note-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="card orange lighten-4" *ngIf="(note$ | async) as note">
          <p class="note flow-text">
              <i class="material-icons">announcement</i>
              <b>{{note.title}}</b> {{note.content}} <span *ngIf="note.link"><a href="{{note.link}}">{{note.lcontent}}</a></span>{{note.content2}}
          </p>
      </div>
    `
})
export class NoteItemComponent implements OnInit {
  @Input()
  uid: string;
  note$: Observable<any>;
  constructor(private firestore: fromServices.FirestoreService) {}
  ngOnInit() {
    // console.log(this.uid);
    if (this.uid) {
      this.note$ = this.firestore.doc$(`/structure/helpers/notes/${this.uid}`);
    }
  }
}
