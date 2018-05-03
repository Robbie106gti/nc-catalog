import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'table-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div *ngFor="let i of iwhd['main']">
    <div class="card padding unset" *ngIf="i.codes">
        <table class="striped highlight centered">
            <thead>
            <tr>
                <th>Cabinet Widths</th>
                <th>Order Codes</th>
            </tr>
            </thead>
            <tbody id="tbody">
                <tr *ngFor="let code of i.codes"><td>{{code}}"</td><td><ul><li><span class="ordercode" cart="">{{ content.code }}{{code}}{{ version }}</span></li></ul></td></tr>
            </tbody>
        </table>
    </div>
</div>
    `
})
export class TableItemComponent {
  @Input() content: any;
  @Input() iwhd: any;
  @Input() version: any;
}
