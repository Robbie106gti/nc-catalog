import {
    Component,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'upload-input',
    template: `
<div class="chip" *ngIf="pct >= 99 && pctfile === name" >
  <img *ngIf="url && pctfile === name" [src]="url" [alt]="title">
    <i class="close material-icons teal-text text-darken-4">done</i> {{ name }}
</div>
<loader *ngIf="pct >= 1 && pct <= 99 && pctfile === name" [pct]="pct"></loader>
<div class="file-field input-field"
dropZone
(dropped)="startUpload($event)">

    <div class="btn">
        <span>{{button}}</span>
        <input type="file"
        (change)="startUpload($event.target.files)">
    </div>
    <div class="file-path-wrapper">
        <input class="file-path validate"
        type="text" placeholder="Upload a image for {{ title }}">
    </div>
</div>`,
})
export class UploadInputComponent {
  @Input() edit: any;
  @Input() user: any;
  @Input() title: string;
  @Input() button: string;
  @Input() pct: number;
  @Input() pctfile: string;
  @Input() url: string;
  @Output() file = new EventEmitter<any>();
  name: string;

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    this.name = file.name;
    // Client-side validation example 
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.file.emit({ file, user: this.user, title: this.title, item: this.edit, type: this.button });
  }
}
