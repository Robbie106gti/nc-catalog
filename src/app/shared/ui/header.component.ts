import {
  Component,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <nav>
    <div class="nav-wrapper brown darken-3">
      <div class="whiteLine"></div>
      <a href="https://nickels-catalog.firebaseapp.com/" class="brand-logo">
        <img class="imageLogo" src="/assets/icons/logoNC.png" alt="Nickels Cabinets"/>
        <span class="headingLogo"> <i class="material-icons">collections_bookmark</i> Catalog</span>
      </a>
      <ul class="right hide-on-med-and-down">
        <li>{{ user.fullName }}</li>
        <li><a href="#!"><i class="material-icons">search</i></a></li>
        <!-- <li><a href="badges.html"><i class="material-icons">view_module</i></a></li>
        <li><a href="collapsible.html"><i class="material-icons">refresh</i></a></li>
        <li><a href="mobile.html"><i class="material-icons">more_vert</i></a></li>-->
      </ul>
    </div>
    <a id="TopPage"></a>
  </nav>
  `
})
export class HeaderComponent {
  @Input() user: any;
  constructor() { }
}
