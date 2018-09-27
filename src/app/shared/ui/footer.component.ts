import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <footer class="page-footer brown darken-3 no-print">
  <!-- <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Footer Content</h5>
            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
              <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div> -->
      <div class="footer-copyright container">
        <div class="row valign-wrapper">
        <span class="center-align">© 2018 Copyright Nickels Cabinets</span>
       <!-- <a class="grey-text text-lighten-4 right" href="https://nickels-catalog.firebaseapp.com/">Start Catalog</a> -->
        </div>
       <div class="right"><small>Version 0.1.2.1 @ Alpha</small></div>
      </div>
      <a id="BottomPage"></a>
    </footer>
  `
})
export class FooterComponent {
  constructor() {}
}
