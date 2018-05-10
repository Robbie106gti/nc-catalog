import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;
declare var M: any;

@Component({
  selector: 'spec-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card-panel grey lighten-3 bullet">
        <span class="card-title">
            <i *ngIf="user.roles.admin" class="material-icons right pointer" (click)="Edit()">build</i>
            <h4>Specifications</h4>
        </span>
        <div class="divider"></div>
        <ul class="flow-text" *ngIf="iwhd.v === 'main'; else version">
            <li id="dim">
                <ul><b>Dimensional adjustments</b>
                    <li class="second" *ngFor="let i of iwhd['main']"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
                </ul>
            </li>
            <li *ngFor="let spec of specs['main']"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
        </ul>
    </div>
    <spec-form [iwhd]="iwhd" [specs]="specs" [results$]="results$" [content]="content"
    (search)="Search($event)" (update)="Update($event)" (remove)="Remove($event)"></spec-form>

    <ng-template #version>
    <ul class="flow-text">
        <li id="dim">
            <ul><b>Dimensional adjustments</b>
            <li class="second" *ngFor="let i of iwhd['main']"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
            <li class="second" *ngFor="let i of iwhd[iwhd.v]"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
            </ul>
        </li>
        <li *ngFor="let spec of specs['main']"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
        <li *ngFor="let spec of specs[specs.v]"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
    </ul>
    </ng-template>
    `
})
export class SpecContentComponent {
  @Input() iwhd: any;
  @Input() specs: any;
  @Input() content: any;
  @Input() user: any;
  @Input() results$: any;
  @Output() search = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  Edit() {
    $('#modal1').modal('open');
  }

  Search(event) {
    this.search.emit(event);
  }

  Update(event) {
    this.update.emit(event);
  }

  Remove(event) {
    this.remove.emit(event);
  }
}
