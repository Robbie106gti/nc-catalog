import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" [src]="user.image">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">{{ user.firstName }}<i class="material-icons right">more_vert</i></span>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{{ user.fullName }}<i class="material-icons right">close</i></span>
      <p>{{ user | json }}</p>
    </div>
  </div>
  `,
  styles: [
    `
      .card {
        min-height: 18em;
      }
      img {
        max-width: 100% !important;
      }
    `
  ]
})
export class UserComponent {
  @Input()
  user: any;
  @Output()
  updatedUser = new EventEmitter<any>();

  UpdateUser(event) {
    this.updatedUser.emit(event);
  }
}
