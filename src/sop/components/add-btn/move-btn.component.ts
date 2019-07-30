import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

declare var M: any;

@Component({
  selector: 'move-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="btn blue dropdown-trigger tooltipped"
      #dropdown
      #tooltipped
      name="dropdown"
      data-target="dropdownmove"
      data-position="left"
      data-tooltip="Move SOP to another category"
    >
      <i class="material-icons left">swap_horiz</i>Move
    </a>

    <!-- Dropdown Structure -->
    <ul id="dropdownmove" class="dropdown-content" *ngIf="cats$ | async as cats">
      <li *ngFor="let cat of cats">
        <a (click)="Move(cat)">{{ cat.title }}</a>
      </li>
    </ul>
  `
})
export class MoveBtnComponent implements AfterViewInit, OnChanges {
  @Output() move = new EventEmitter<any>();
  cats$: Observable<any>;
  elems = document.querySelectorAll('.dropdown-trigger');

  constructor(private store: Store<fromStore.SopsState>) {
    this.cats$ = this.store.select(fromStore.getCats);
  }

  ngAfterViewInit(): void {
    this.updateDropdown();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categories$']) {
      this.updateDropdown();
    }
  }

  updateDropdown() {
    const options = {
    hover: true,
    alignment: 'left',
    constrainWidth: false,
    coverTrigger: false
  };
    this.elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(this.elems, options);
  }

  Move(newCat) {
    this.move.emit(newCat);
  }
}
