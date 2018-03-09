import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'image-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="file-field input-field col {{ size }}">
    <chip-image *ngIf="pct >= 99 && url" [url]="url" [size]="'s12'" [fileName]="fileName" ></chip-image>
    <loader *ngIf="pct <= 99 && pct >= 0" [pct]="pct"></loader>
    <div class="btn">
      <span>File</span>
      <input type="file">
    </div>
    <div class="file-path-wrapper">
      <input class="file-path validate" [placeholder]="title" type="text">
    </div>
  </div>`,
})
export class ImageUploadComponent {
  @Input() title: string;
  @Input() size: string;
  pct = 100;
  url = 'https://usa.denon.com/Assets/images/Support_Warranty_Extended.jpg';
  fileName = 'some weird name.jpg';

}
