import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;
declare var M: any;

@Component({
  selector: 'gen-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="col m12" *ngFor="let att of content.attached">
        <div class="card-panel grey lighten-3">
            <span class="card-title">
                <h4>{{ att.title }}</h4>
            </span>
            <div class="divider"></div>
            <div class="cards-2">
                <div class="flow-text">
                    <p *ngFor="let par of att.paragraphs" >{{ par.text}}</p>
                </div>
                <div class="">
                    <div class="card-panel" *ngFor="let img of att.images">
                        <img class="responsive-img materialboxed" [src]="img.image" [alt]="img.title">
                    </div>
                </div>
            </div>
            <i><small>Updated: {{ att.updatedBy }} - {{ att?.updatedAt || 'no time' }}</small></i>
        </div>
    </div>
    `,
  styles: [
    `
    .cards-2 {
      display: -ms-grid;
      display: grid;
      -ms--ms-grid-columns: 65% 35%;
        grid-template-columns: 65% 35%;
    }
    `
  ]
})
export class GenInfoComponent {
  @Input() content: any;
  constructor() {
    $(document).ready(function() {
      $('.materialboxed').materialbox();
    });
  }
}
