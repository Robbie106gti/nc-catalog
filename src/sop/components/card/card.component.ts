import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<edit-btn *ngIf="roles.editor" class="tool-item" (edit)="Edit($event)"></edit-btn>
<a [routerLink]="[card.link]">
  <div class="card-image of-hidden">
    <img [src]="card.image" [alt]="card.title" class="responsive-img image20 activator">
  </div>
  <div class="card-content">
    <span class="card-title">{{ card.title }}</span>
  </div>
</a>
`
})
export class CardComponent {
  @Input()
  card: any;
  @Input()
  roles: any;
  @Output()
  edit = new EventEmitter<any>();

  Edit(event) {
    this.edit.emit({ ...this.card, titleOld: this.card.title });
  }
}
