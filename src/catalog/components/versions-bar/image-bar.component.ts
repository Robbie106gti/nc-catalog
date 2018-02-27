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
        <div *ngIf="content.versions; else backup">
            <a [routerLink]="[version.height]" >
                <span *ngIf="content.versions[version.height].images; else icon">
                    <img *ngIf="content.versions[version.height].images.image; else icon"
                    [src]="content.versions[version.height].images.image.image"
                    class="responsive-img" alt="{{ content.title }}" (click)="Selected()" >
                </span>
                <p>{{ content.title }} {{ version.height }}{{ version.version || '" high'}}</p>
            </a>
        </div>
    </div>

    <ng-template #icon>
        <i class="material-icons large" (click)="Selected()" >image</i>
    </ng-template>

    <ng-template #backup>
    <a [routerLink]="[version.height]" >
        <i class="material-icons large" (click)="Selected()" >image</i>
        <p>{{ content.title }} {{ version.height }}{{ version.version || '" high'}}</p>
    </a>
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
