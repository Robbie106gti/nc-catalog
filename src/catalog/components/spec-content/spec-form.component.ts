import {
    Component,
    Input,
    Output,
    EventEmitter,
    } from '@angular/core';

    import { Store } from '@ngrx/store';
    import { Observable } from 'rxjs/Observable';
    import { tap, filter, take } from 'rxjs/operators';
    import * as fromStore from '../../store';

    declare var $: any;
    declare var Materialize: any;

    @Component({
    // tslint:disable-next-line:component-selector
    selector: 'spec-form',
    template: `
    <div id="modal1" class="modal modal-fixed-footer" *ngIf="(results$ | async) as results">
        <div class="modal-content">
            <div class="row"><a (click)="Close()" class="secondary-content"><i class="material-icons small grey-text pointer">clear</i></a>
                <div class="col s12 m6">
                    <h4>Update Dimentions</h4>
                    <div class="input-field">
                        <input id="email" type="text" #dim (keyup)="Search(dim.value, 'iwhd')">
                        <label for="email" data-error="wrong" data-success="right">Add one, start typing...</label>
                    </div>
                    <div >
                        <ul *ngIf="results.length > 0 && cat == 'iwhd'" class="collection"><li class="collection-item" *ngFor="let r of results">
                            <div>{{r.title}} - {{r.content}}
                            <a (click)="Update(r)" class="secondary-content"><i class="material-icons pointer">send</i></a></div>
                        </li></ul>
                    </div>
                </div>
                <div class="col s12 m6">
                    <ul><b>Dimensional adjustments</b>
                        <li class="second" *ngFor="let i of iwhd"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}
                        <a (click)="Remove(i)" class="secondary-content"><i class="material-icons red-text pointer tiny">clear</i></a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <h4>Update Specifications</h4>
                    <div class="input-field">
                        <input id="email" type="text" #spec (keyup)="Search(spec.value, 'specifications')">
                        <label for="email" data-error="wrong" data-success="right">Add one, start typing...</label>
                    </div>
                    <div >
                        <ul *ngIf="results.length > 0 && cat == 'specifications'" class="collection"><li class="collection-item" *ngFor="let r of results">
                            <div>{{r.title}} - {{r.content}}
                            <a (click)="Update(r)" class="secondary-content"><i class="material-icons pointer">send</i></a></div>
                        </li></ul>
                    </div>
                </div>
                <div class="col s12 m6">
                    <ul><b>Specifications</b>
                        <li *ngFor="let spec of specs"><b>{{spec?.title}}</b>: {{ spec?.content }}
                        <a (click)="Remove(spec)" class="secondary-content"><i class="material-icons red-text pointer tiny">clear</i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `,
    })
    export class SpecFormComponent {
    @Input() iwhd: any;
    @Input() specs: any;
    @Input() results$: Observable<any>;
    @Output() search = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();

    cat: string;

  constructor(private store: Store<fromStore.ProductsState>) {
        $(document).ready(function() {
            $('select').material_select();
            $('.modal').modal({
                startingTop: '4%',
                endingTop: '10%',
            });
        });
    }

    Search(value: string, str: string) {
        if (value.length > 1) {
            this.cat = str;
            this.search.emit({ category: str, value: value });
        }
    }

    Update(r) {
        if (r.sub === 'iwhd') { this.iwhd.push(r); } else { this.specs.push(r); }
        this.update.emit(r);
    }

    Remove(r) {
        if (r.sub === 'iwhd') { this.iwhd = this.iwhd.filter(item => item.id !== r.id); } else { this.specs = this.specs.filter(item => item.id !== r.id); }
        this.remove.emit({ ...r, 'toDo': 'remove' });
    }
    Close() { $('#modal1').modal('close'); }

}
