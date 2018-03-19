import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;
declare var Materialize: any;

@Component({
selector: 'image-card',
changeDetection: ChangeDetectionStrategy.OnPush,
template: `
<div class="card" [ngClass]="card.size || 'small'">
  <div class="card-image">
    <img [src]="card.image" [alt]="card.title" class="responsive-img materialboxed">
  </div>
  <div class="card-content">
    <span class="card-title">{{ card.title }}</span>
  </div>
</div>
`
})
export class ImageCardComponent {
  @Input() card: any;

  constructor () {
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });
  }
}
