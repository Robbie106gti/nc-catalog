import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'note-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="card orange lighten-4" *ngFor="let note of specials.notes['main']">
          <p class="note flow-text">
              <i class="material-icons">announcement</i>
              <b>{{note.title}}</b> {{note.content}} <span *ngIf="note.link"><a href="{{note.link}}">{{note.lcontent}}</a></span>{{note.content2}}
          </p>
      </div>
      <div class="card orange lighten-4" *ngFor="let note of specials.notes[v]">
          <p class="note flow-text">
              <i class="material-icons">announcement</i>
              <b>{{note.title}}</b> {{note.content}} <span *ngIf="note.link"><a href="{{note.link}}">{{note.lcontent}}</a></span>{{note.content2}}
          </p>
      </div>
    `
})
export class NoteItemComponent {
  @Input() where: string;
  @Input() uid: string;
  note$: Observable<any>;
  constructor(private firestore: fromServices.FirestoreService) {
    this.note$ = this.firestore.doc$(`/structure/helpers/${this.where}/${this.uid}');
  }

}
