import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'form-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <edit-form-cab
  *ngIf="edit"
  [user]="user" [edit]="edit" [pct]="pct" [pctfile]="pctfile" [url]="downloadURL" [results$]="results$"
  (close)="Close($event)" (file)="UploadFile($event)" (update)="Update($event)" (search)="Search($event)"
  ></edit-form-cab>
  `,
})
export class FormCabComponent {
  @Input() edit: any;
  @Input() user: any;
  @Input() pct: any;
  @Input() pctfile: any;
  @Input() downloadURL: string;
  @Input() results$: Observable<any>;

  @Output() close = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<any>();
  @Output() upload = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  Close(event) { this.close.emit(true); }
  UploadFile(event) { this.upload.emit({...event, item: this.edit }); }
  Update(event) { this.update.emit({...event, item: this.edit }); }
  Search(event) { this.search.emit(event); }
}
