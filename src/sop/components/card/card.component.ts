import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
selector: 'card',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="card">
  <a [routerLink]="[card.title]">
    <div class="card-image">
      <img [src]="card.image" [alt]="card.title" class="responsive-img">
    </div>
    <div class="card-content">
      <span class="card-title">{{ card.title }}</span>
    </div>
  </a>
</div>
`,
})
export class CardComponent {
  @Input() card: any;
}
