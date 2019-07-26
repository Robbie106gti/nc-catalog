import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    AfterViewInit,OnChanges, SimpleChanges
  } from '@angular/core';
  import { Store } from '@ngrx/store';
  import * as fromStore from '../../store';
  import { Observable } from 'rxjs/Observable';
  
declare var M: any;

  @Component({
  selector: 'move-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <a class="btn blue dropdown-trigger tooltipped" #dropdown #tooltipped  name="dropdown"  data-target="dropdownmove"  data-position="left" data-tooltip="Move SOP to another category">
    <i class="material-icons left">swap_horiz</i>Move
  </a>

  <!-- Dropdown Structure -->
  <ul id='dropdownmove' class='dropdown-content'>
    <li><a (click)="Move()">one</a></li>
    <li><a >two</a></li>
  </ul>
  `,
  })
  export class MoveBtnComponent implements AfterViewInit, OnChanges {
    @Output() move = new EventEmitter<{}>();
    categories$: Observable<any>;
    elems = document.querySelectorAll('.dropdown-trigger');
    

    constructor(private store: Store<fromStore.SopsState>) {
      this.categories$ = this.store.select(fromStore.getSopsCat);
    }

  ngAfterViewInit(): void {
    this.elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(this.elems, { hover: true });
  }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['categories$']) {
        this.elems = document.querySelectorAll('.dropdown-trigger');
        const instances = M.Dropdown.init(this.elems, { hover: true });
    }
  } 
  
    Move() {
        console.log(this.categories$)
      // this.move.emit(true);
    }
  }
  