import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'results-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<a [routerLink]="['..',card.sub,card.link]">
  <div class="card-image of-hidden">
    <img [src]="card.image" [alt]="card.title" class="responsive-img image20 activator">
  </div>
  <div class="card-content">
    <span class="card-title">{{ card.title }}</span>
  </div>
</a>
`
})
export class ResultsCardComponent {
  @Input()
  card: any;
}
