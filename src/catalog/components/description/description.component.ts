import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'description-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="card-panel  blue-grey darken-1 white-text">
    <span class="card-title">
        <h4>Description</h4>
    </span>
    <div class="divider"></div>
    <span id="des" class="flow-text">{{ content.title }}, {{ content.description || 'Add a description'}}</span>
</div>
`
})
export class DescriptionComponent {
  @Input() content: any;
}
