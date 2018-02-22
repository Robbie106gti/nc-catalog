import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';
  import { Observable } from 'rxjs/Observable';

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
                    <li class="second" *ngFor="let i of iwhd"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
                </ul>
            </li>
            <li *ngFor="let spec of specs"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
        </ul>
    </div>
    `,
  })
  export class SpecContentComponent {
    @Input() iwhd: any;
    @Input() specs: any;
  }
