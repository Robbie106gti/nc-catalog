import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card orange lighten-4" *ngFor="let note of notes">
        <p class="note flow-text">
            <i class="material-icons">announcement</i>
            <b>{{note.title}}</b>, {{note.content}}
        </p>
    </div>
  `,
})
export class NoteComponent {
  @Input() notes: any;
}
