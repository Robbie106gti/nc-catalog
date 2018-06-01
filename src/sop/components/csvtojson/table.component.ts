import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'table-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="card">
    <table class="striped highlight">
      <thead>
            <tr>
                <th *ngFor="let hd of table?.headers">{{ hd | titlecase }}</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let row of table?.rows">
              <td *ngFor="let hd of table?.headers">{{ row[hd] | titlecase }}</td>
            </tr>
          </tbody>
    </table>
  </div>
`
})
export class TableComponent {
  @Input() table: any;
  @Output() remove = new EventEmitter<boolean>();

  Remove(event) {
    this.remove.emit(true);
  }
}
