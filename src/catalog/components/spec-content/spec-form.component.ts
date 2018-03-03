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
    templateUrl: './spec-form.component.html',
    })
    export class SpecFormComponent {
    @Input() iwhd: any;
    @Input() specs: any;
    @Input() content: any;
    @Input() results$: Observable<any>;
    @Output() search = new EventEmitter<any>();
    @Output() update = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();

    cat: string;
    id: string;

  constructor(private store: Store<fromStore.ProductsState>) {
        $(document).ready(function() {
            $('select').material_select();
            $('.modal').modal({
                startingTop: '4%',
                endingTop: '10%',
            });
            $('ul.tabs').tabs();
        });
        this.id = 'main';
    }

    setId(id: string) {
        this.id = id;
    }

    Search(value: string, str: string, id: string) {
        if (value.length > 1) {
            this.cat = str;
            this.id = id;
            this.search.emit({ category: str, value: value });
        }
    }

    Update(r) {
        if (r.sub === 'iwhd') { this.iwhd[this.id].push(r); } else { this.specs[this.id].push(r); }
        this.update.emit({...r, version: this.id });
    }

    Remove(r) {
        if (r.sub === 'iwhd') { this.iwhd[this.id] = this.iwhd[this.id].filter(item => item.id !== r.id); } else { this.specs[this.id] = this.specs[this.id].filter(item => item.id !== r.id); }
        this.remove.emit({ ...r, 'toDo': 'remove' });
    }
    Close() { $('#modal1').modal('close'); }

}
