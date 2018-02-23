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
    <div id="modal1" class="modal modal-fixed-footer">
        <div class="modal-content">
        <div class="row">
            <div class="col s12 m6">
                <h4>Update Dimentions</h4>
                <div class="input-field">
                    <input id="email" type="text" #dim (keyup)="setItem(dim.value)">
                    <label for="email" data-error="wrong" data-success="right">Add one, start typing...</label>
                </div>
            </div>
            <div class="col s12 m6">
                <ul><b>Dimensional adjustments</b>
                    <li class="second" *ngFor="let i of iwhd"><i class="material-icons">tune</i> {{i.title}} - {{i.content}}</li>
                </ul>
                </div>
                </div>
            <div class="row">
            <div class="col s12 m6">
                <h4>Update Specifications</h4>
                <div class="input-field">
                    <input id="email" type="text">
                    <label for="email" data-error="wrong" data-success="right">Add one, start typing...</label>
                </div>
            </div>
            <div class="col s12 m6">
                <ul><b>Specifications</b>
                    <li *ngFor="let spec of specs"><b>{{spec?.title}}</b>: {{ spec?.content }}</li>
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
    @Input() user: any;
    iwhdAll: any;
    list: any;

    dimSelect: string;
    options = [{id: 1, value: 'Increments'}, {id:2, value:'Depths'},{id:3,value:'Heights'},{id:4,value:'Widths'}]

  constructor(private store: Store<fromStore.ProductsState>) { 
        $(document).ready(function() {
            $('select').material_select();
            $('.modal').modal({
                startingTop: '4%',
                endingTop: '10%',
            });
            $('#modal1').modal('open');
        });
        this.store.select(fromStore.getHelperIWHDs).take(1).subscribe(i => this.iwhdAll = i);
    }

    setItem(value) {
        const search = {
            key: 'iwhd',
            value: value
        }
        // alert(`Hello ${this.dimSelect} and ${value}`);
        console.log(this.iwhdAll);
        if(value.length > 1) {
            // this.list = this.iwhdAll.filter(i => i.content.match(value));
            this.list = this.iwhdAll.map(item => item.content == value);
            console.log(this.list);
        }
    }
    
    }
    