import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'spec-content',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="card-panel grey lighten-3 bullet">
        <span class="card-title">
            <h4>Specifications</h4>
        </span>
        <div class="divider"></div>
        <ul class="flow-text">
            <li id="dim">
                <ul><b>Dimensional adjustments</b>
                    <li class="second"><i class="material-icons">tune</i> Increments - 1/8"</li>
                    <li class="second"><i class="material-icons">tune</i> Widths - 6" - 39"</li>
                    <li class="second"><i class="material-icons">tune</i> Heights - 12" - 18"</li>
                    <li class="second"><i class="material-icons">tune</i> Depths - 12" - 36"</li>
                </ul>
            </li>
            <li><b>Hinging</b>: Specify hinging L (left) or R (right) when applicable.</li>
            <li><b>Doors</b>: Units wider than 24" will have a pair of doors.</li>
            <li><b>Shelves</b>: No adjustable shelves will be added by default for this height.</li>
        </ul>
    </div>
    `,
  })
  export class SpecContentComponent {
    @Input() content: any;
  }
