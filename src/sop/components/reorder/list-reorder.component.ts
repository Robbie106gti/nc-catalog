import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-reorder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <span class="smaller">
    <i class="material-icons pointer up" (click)="Up(i)">expand_more</i>
    <i class="material-icons pointer down" (click)="Down(i)">expand_less</i>
  </span>
  `,
  styles: [
    `
      .up {
        position: relative;
        float: left;
        font-size: 16px !important;
      }
      .down {
        position: relative;
        float: left;
        font-size: 16px !important;
      }
    `
  ]
})
export class ListReorderComponent {
  @Input()
  list = new Array();
  @Input()
  i: number;
  @Output()
  reorderedList = new EventEmitter<any>();

  Up(i) {
    const li = this.list[i];
    li.sorted = true;
    this.Reorder(li, i + 1, i);
  }

  Down(i) {
    const li = this.list[i];
    this.Reorder(li, i - 1, i);
  }

  Reorder(item, newindex, oldindex) {
    let arr = new Array();
    arr = this.list;
    arr.splice(oldindex, 1);
    arr.splice(newindex, 0, item);
    this.list = arr;
    this.reorderedList.emit(this.list);
  }
}
