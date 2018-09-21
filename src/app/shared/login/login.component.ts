import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <!-- <login-form
  [loaded]="(loaded$ | async)"
  [loading]="(loading$ | async)"
  [status]="(status$ | async)"
  [fails]="(fails$ | async)"
  (login)="loginWQ($event)"
  ></login-form> -->

  <div class="slider fullscreen" style="touch-action: pan-y; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
    <ul class="slides">
      <li class="velocity-animating" style="opacity: 0.940592; transform: translateX(0px) translateY(0px);">
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/09.jpg"> <!-- random image -->
        <div class="caption center-align velocity-animating" style="opacity: 0.997476; transform: translateY(-0.252449px) translateX(0px);">
          <h3>Retro modern</h3>
          <h5 class="light grey-text text-lighten-3">Black walnut with clean lines</h5>
        </div>
      </li>
      <li class="velocity-animating active" style="opacity: 0.0594076; transform: translateX(0px) translateY(0px);">
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/img_8297-1024x708.jpg"> <!-- random image -->
        <div class="caption left-align velocity-animating" style="opacity: 0; transform: translateX(-100px) translateY(0px);">
          <h3>Old and new</h3>
          <h5 class="light grey-text text-lighten-3">Combing latest materials on more classical styles.</h5>
        </div>
      </li>
      <li class="" style="opacity: 0; transform: translateX(0px) translateY(0px);">
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/oseen-kitchen-1024x579.jpg"> <!-- random image -->
        <div class="caption right-align" style="opacity: 0; transform: translateX(100px) translateY(0px);">
          <h3>Clean modern kitchens</h3>
          <h5 class="light grey-text text-lighten-3">Clean integrated handles accross all cabinets</h5>
        </div>
      </li>
    </ul>
    <ul class="indicators"><li class="indicator-item"></li><li class="indicator-item active"></li><li class="indicator-item"></li></ul>
  </div>
  `
})
export class LoginComponent {
  constructor() {}
}
