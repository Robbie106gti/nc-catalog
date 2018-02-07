import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'table-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="card padding">
        <table class="striped highlight centered">
            <thead>
            <tr>
                <th>Cabinet Widths</th>
                <th>Order Codes</th>
            </tr>
            </thead>
            <tbody id="tbody">
                <tr><td>09"</td><td><ul><li><span class="ordercode" cart="">BFD0918</span></li></ul></td></tr>
                <tr><td>12"</td><td><ul><li><span class="ordercode" cart="">BFD1218</span></li></ul></td></tr>
                <tr><td>15"</td><td><ul><li><span class="ordercode" cart="">BFD1518</span></li></ul></td></tr>
            </tbody>
        </table>
    </div>
    `,
  })
  export class TableItemComponent {
    @Input() content: any;
  }
