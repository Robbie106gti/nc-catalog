import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';
  import { Observable } from 'rxjs/Observable';
  declare var $: any;
  declare var Materialize: any;

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'spec-content',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="card-panel grey lighten-3 bullet">
        <span class="card-title">
            <i *ngIf="user.roles.admin" class="material-icons right pointer" (click)="Edit()">build</i>
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
    <spec-form [iwhd]="iwhd" [specs]="specs" [results$]="results$" (search)="Search($event)" (update)="Update($event)"></spec-form>
    `,
  })
  export class SpecContentComponent {
    @Input() iwhd: any;
    @Input() specs: any;
    @Input() user: any;
    @Input() results$: any;
    @Output() search = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();

    Edit() {
        $('#modal1').modal('open');
    }

    Search(event) {
        this.search.emit(event);
    }

    Update(event) {
        this.update.emit(event);
    }
  }
