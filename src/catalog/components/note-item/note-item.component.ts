import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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
  @Input() specials: any;
  @Input() v: any;
}
