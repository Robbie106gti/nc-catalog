import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import * as csv from 'csvtojson';

@Component({
  selector: 'csvtojson',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  hello from csvtojson <br>
  <input type="file" accept=".csv" (change)="convertFile($event)">
  <button class="btn red" (click)="removeTable()">Delete table</button>
  `
})
export class CsvToJsonComponent {
  file: File;
  @Output() table = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  convertFile(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(this.file);
    reader.onload = () => {
      this.textToCsv(reader.result);
    };
  }

  removeTable() {
    this.remove.emit(true);
  }

  textToCsv(text) {
    // console.log(text);
    const hds = new Array();
    const rows = new Array();
    const csvjson = csv({ noheader: true })
      .fromString(text)
      .then(jsonArr => {
        jsonArr.forEach((row, index) => {
          if (index === 0) {
            Object.keys(row).map(id => hds.push(row[id].toLocaleLowerCase()));
          } else {
            row = Object.keys(row).map(id => row[id]);
            if (row.length !== hds.length) {
              console.log('Ops looks like you have an empty space');
            }
            const newrow = {};
            hds.forEach((head, i) => {
              newrow[head] = row[i];
            });
            rows.push(newrow);
          }
        });
        const table = { headers: hds, rows: rows };
        return table;
      })
      .then(tab => {
        this.table.emit(tab);
      });
  }
}
