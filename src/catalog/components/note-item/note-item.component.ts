import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'note-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="card orange lighten-4">
        <p class="note flow-text">
            <i class="material-icons">announcement</i>
            <b>Movento slides</b>, due to the size of Movento hardware, drawerboxes below 8 3/8" wide will use Tandem not Movento slides.
        </p>
    </div>
    `,
  })
  export class NoteItemComponent {
    @Input() content: any;
  }
