import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'image-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="file-field input-field col {{ size }}" dragNdrop>
    <chip-image *ngIf="pct >= 99 && url && fileName" [url]="url" [size]="'s12'" [fileName]="fileName" ></chip-image>
    <loader *ngIf="pct <= 99 && pct >= 1" [pct]="pct"></loader>
    <div class="btn">
      <span>Image</span>
      <input type="file" (change)="startUpload($event.target.files)">
    </div>
    <div class="file-path-wrapper">
      <input class="file-path validate" [placeholder]="title" type="text">
    </div>
  </div>`,
})
export class ImageUploadComponent {
  @Input() title: string;
  @Input() size: string;
  @Input() pct: number;
  @Input() url: string;
  @Output() file = new EventEmitter<any>();

  @Input() fileName: string;

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    this.fileName = file.name;
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.file.emit(file);
  }

}