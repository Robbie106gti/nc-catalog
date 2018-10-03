import { Component, Input, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import * as fromServices from '../../services';
import { Observable } from 'rxjs/Observable';
import { Tooltips } from '../../../app/shared/materialize/selectors';

@Component({
  selector: 'table-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div *ngIf="width$ | async as widths">
    <div class="card padding unset" *ngIf="widths.codes">
        <table class="striped highlight centered">
            <thead>
            <tr>
                <th>Cabinet Widths</th>
                <th>Order Codes</th>
            </tr>
            </thead>
            <tbody id="tbody">
                <tr class="tooltipped" *ngFor="let w of widths.codes" data-position="bottom" data-tooltip="returnCode(conent.code,w,v)"><td>{{w}}"</td><td><ul><li><span class="ordercode" cart="">{{ content.code }}{{w}}{{ v }}</span></li></ul></td></tr>
            </tbody>
        </table>
    </div>
</div>
`
})
export class TableItemComponent implements OnInit, AfterViewInit {
  @Input()
  content: any;
  @Input()
  v: any;
  @Input()
  width: any;

  width$: Observable<any>;
  constructor(private firestore: fromServices.FirestoreService) {}
  ngOnInit() {
    this.width$ = this.firestore.doc$(`/structure/helpers/iwhd/${this.width}`);
  }

  ngAfterViewInit(): void {
    Tooltips();
  }

  returnCode(code, w, v) {
    return `Add ${code}${w}${v} to your order)`;
  }
}
