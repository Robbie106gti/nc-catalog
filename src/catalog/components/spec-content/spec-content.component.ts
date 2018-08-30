import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'spec-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spec-content.html'
})
export class SpecContentComponent {
  @Input()
  content: any;
  @Input()
  v: string;
}
