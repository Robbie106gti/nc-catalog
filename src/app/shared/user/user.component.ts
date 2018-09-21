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
      <ul class="collection">
        <li class="collection-item"><div>First name: <b>{{ user.firstName }}</b></div></li>
        <li class="collection-item"><div>Last name: <b>{{ user.lastName }}</b></div></li>
        <li class="collection-item"><div><a href="#!" class="secondary-content"><i class="material-icons">work</i></a>Status: <b>{{ user?.status }}</b></div></li>
        <li class="collection-item"><div><a href="#!" class="secondary-content"><i class="material-icons">local_post_office</i></a>E-mail: <b>{{ user.email }}</b></div></li>
        <li class="collection-item"><div><a href="#!" class="secondary-content"><i class="material-icons">phone</i></a>Phone ext:<b> #{{ user?.ext }}</b></div></li>
        <li class="collection-item"><div>Position: <b>{{ user?.position }}</b></div></li>
      </ul><h5>Roles</h5>
      <ul class="collection">
        <li class="collection-item"><div>Dealer: <on-off class="secondary-content" [active]="user.roles.dealer" (offOn)="UpdateRoles($event, user.roles, 'dealer', user.id)"></on-off></div></li>
        <li class="collection-item"><div>Nickels: <on-off class="secondary-content" [active]="user.roles.nickels" (offOn)="UpdateRoles($event, user.roles, 'nickels', user.id)"></on-off></div></li>
        <li class="collection-item"><div>Editor: <on-off class="secondary-content" [active]="user.roles.editor" (offOn)="UpdateRoles($event, user.roles, 'editor', user.id)"></on-off></div></li>
        <li class="collection-item"><div>Sop: <on-off class="secondary-content" [active]="user.roles.sop" (offOn)="UpdateRoles($event, user.roles, 'sop', user.id)"></on-off></div></li>
        <li class="collection-item"><div>Reader: <on-off class="secondary-content" [active]="user.roles.reader" (offOn)="UpdateRoles($event, user.roles, 'reader', user.id)"></on-off></div></li>
        <li class="collection-item"><div>Admin: <on-off class="secondary-content" [active]="user.roles.admin" (offOn)="UpdateRoles($event, user.roles, 'admin', user.id)"></on-off></div></li>
      </ul><h5>Updated</h5>
      <ul class="collection">
        <li class="collection-item"><div>Last login: <b>{{ user.updatedAt }}</b></div></li>
        <li class="collection-item"><div>First login: <b>{{ user.createdAt }}</b></div></li>
      </ul>
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
  UpdateRoles(event, roles, role, id) {
    const user = {
      roles: roles,
      id
    };
    user.roles[role] = event;
    console.log(user, event);
  }
}
