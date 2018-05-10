import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'door-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './door-info.html'
})
export class DoorInfoComponent {
  @Input() content: any;
  @Input() user: any;

  constructor() {}
}
