import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
  styleUrls: ['../app.styles.scss']
})
export class AppComponent {
  constructor() {
    document.getElementById('splash').style.display = 'none';
  }
}
