import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pdfs-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <ul class="collection with-header">
      <li class="collection-header"><h5>Attached PDF's for additional information</h5></li>
        <li *ngFor="let pdf of pdfs" class="collection-item"><a target="_blank" [href]="pdf.url">pdf.title <small>({{ pdf.filename }})</small></a></li>
      </ul>
    </div>
  `
})
export class PdfsTableComponent {
  @Input()
  pdfs: any;
}
