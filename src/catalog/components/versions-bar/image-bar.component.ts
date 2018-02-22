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
        <a [routerLink]="[version.height || version.version]" >
            <img *ngIf="content.versions[version.height || version.version].images.image; else icon" [src]="content.versions[version.height || version.version].images.image.image"
                class="responsive-img" alt="{{ content.title }}" (click)="Selected()" >
            <p>{{ content.title }} {{ version.height }}{{ version.version || '" high'}}</p>
        </a>
    </div>

    <ng-template #icon>
        <i class="material-icons large">image</i>
    </ng-template>
    `,
  })
  export class ImageBarComponent {
    @Input() version: any;
    @Input() content: any;
    @Input() user: any;
    @Output() select = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();

    Selected() { this.select.emit({ version: this.version, content: this.content }); }
    Edit() { this.edit.emit({ version: this.version, content: this.content }); }
  }
