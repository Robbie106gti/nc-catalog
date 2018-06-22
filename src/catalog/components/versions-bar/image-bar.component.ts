import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'image-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="col s2 m1 card">
        <div *ngIf="content.versions; else backup">
            <a [routerLink]="[version.height]" >
                <span *ngIf="content.versions[version.height].images; else icon">
                    <img *ngIf="content.versions[version.height].images.image; else icon"
                    [src]="content.versions[version.height].images.image.image"
                    class="responsive-img" alt="{{ content.title }}">
                </span>
                <p>{{ version.title }}<span *ngIf="!version.version">{{ '" high'}}</span></p>
            </a>
        </div>
    </div>

    <ng-template #icon>
        <i class="material-icons large" >image</i>
    </ng-template>

    <ng-template #backup>
    <a [routerLink]="[version.height]" >
        <i class="material-icons large" >image</i>
        <p>{{ version.height }}{{ version.version || '" high'}}</p>
    </a>
    </ng-template>
    `
})
export class ImageBarComponent {
  @Input() version: any;
  @Input() content: any;
}
