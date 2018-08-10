import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as resizer from './resizer';

@Component({
  selector: 'image-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="file-field input-field col {{ size }}" dragNdrop>
  <chip-image *ngIf="pct >= 99 && url && fileName" [url]="url" [size]="'s12'" [fileName]="fileName"></chip-image>
  <loader *ngIf="pct <= 99 && pct >= 1" [pct]="pct"></loader>
  <div class="btn">
    <span>Image</span>
    <input type="file" (change)="startUpload($event.target.files)">
  </div>
  <div class="file-path-wrapper">
    <input class="file-path validate" [placeholder]="title" type="text">
  </div>
</div>
<span>
  <label>
    <input type="checkbox" [(ngModel)]="replace" />
    <span>Replace Original Image</span>
  </label>
</span>
  `
})
export class ImageUploadComponent {
  @Input()
  title: string;
  @Input()
  size: string;
  @Input()
  pct: number;
  @Input()
  url: string;
  @Output()
  file = new EventEmitter<any>();

  @Input()
  fileName: string;

  replace: boolean = false;
  constructor() {
    console.log(this.url);
  }

  async startUpload(event: FileList) {
    // The File object
    const file2 = event.item(0);
    this.fileName = file2.name;
    console.log(file2);
    // Client-side validation example
    if (file2.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    const config = {
      file: file2,
      maxSize: 1080
    };
    const resizedImage: any = await resizer.resizeImage(config);
    // console.log('upload resized image', resizedImage);
    resizedImage.name = this.fileName;
    const upload = file2.size >= resizedImage.size ? resizedImage : file2;
    upload.replace = this.replace;
    this.file.emit(upload);
  }
}
