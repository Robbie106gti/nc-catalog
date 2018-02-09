import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'image-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="col s2 m1 card">
        <div class="tool-item" *ngIf="user.roles.admin">
            <i class="material-icons indigo-text text-darken-1" (click)="Edit()">edit</i>
        </div>
        <img *ngIf="version.image; else icon" src="{{ version.image }}"
            class="responsive-img materialboxed" alt="{{ content.title }}" (click)="Selected()" >
        <p>{{ content.title }} {{ version.height }}{{ version.version || '" hight'}}</p>
    </div>

    <ng-template #icon>
        <i class="material-icons large">image</i>
    </ng-template>
    `,
  })
  export class ImageBarComponent {
    editing: boolean;
    @Input() version: any;
    @Input() content: any;
    @Input() user: any;
    @Output() select = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    Selected() { this.select.emit({ version: this.version, content: this.content }); }
    Edit() { this.edit.emit({ version: this.version, content: this.content }); }
  }
