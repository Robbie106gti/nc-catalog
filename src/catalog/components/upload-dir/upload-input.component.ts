import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    OnInit
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'upload-input',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
<div class="file-field input-field"
dropZone
(dropped)="startUpload($event)">
    <div class="btn">
        <span>{{button}}</span>
        <input type="file"
        (change)="startUpload($event.target.files)">
    </div>
    <div class="file-path-wrapper">
        <i *ngIf="pct === 100" class="material-icons prefix teal-text text-darken-4">done</i>
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
  @Output() file = new EventEmitter<any>();

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.file.emit({ file, user: this.user, title: this.title, item: this.edit, type: this.button });
  }
}
