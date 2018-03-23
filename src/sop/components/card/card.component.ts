import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
selector: 'card',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="card">
  <edit-btn class="tool-item" (edit)="Edit($event)"></edit-btn>
  <a [routerLink]="[card.title]">
  <div class="card-image">
      <img [src]="card.image" [alt]="card.title" class="responsive-img">
  </div>
  <div class="card-content">
      <span class="card-title">{{ card.title }}</span>
  </div>
  </a>
</div>
`
})
export class CardComponent {
  @Input() card: any;
  @Output() edit = new EventEmitter<any>();

  Edit(event) {
    this.edit.emit({ ...this.card, titleOld: this.card.title });
  }
}
