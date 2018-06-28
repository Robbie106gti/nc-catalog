import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'spec-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card-panel grey lighten-3 bullet">
        <span class="card-title">
            <h4>Specifications</h4>
        </span>
        <div class="divider"></div>
        <ul class="flow-text" *ngIf="v === 'main'; else version">
            <li id="dim">
                <ul><b>Dimensional adjustments</b>
                    <li class="second" *ngFor="let i of specials.iwhd['main']"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
                </ul>
            </li>
            <li *ngFor="let spec of specials.specs['main']"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
        </ul>
    </div>

    <ng-template #version>
    <ul class="flow-text">
        <li id="dim">
            <ul><b>Dimensional adjustments</b>
            <li class="second" *ngFor="let i of specials.iwhd['main']"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
            <li class="second" *ngFor="let i of specials.iwhd[v]"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
            </ul>
        </li>
        <li *ngFor="let spec of specials.specs['main']"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
        <li *ngFor="let spec of specials.specs[v]"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
    </ul>
    </ng-template>
    `
})
export class SpecContentComponent {
  @Input() content: any;
  @Input() specials: any;
  @Input() v: string;
}
