import { Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
declare var M: any;

@Component({
  selector: 'slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div #slider name="slider" class="slider fullscreen">
    <ul class="slides">
      <li>
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/09.jpg">
        <div class="caption center-align">
          <h3>Retro modern</h3>
          <h5 class="light grey-text text-lighten-3">Black walnut with clean lines</h5>
        </div>
      </li>
      <li>
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/img_8297-1024x708.jpg">
        <div class="caption left-align">
          <h3>Old and new</h3>
          <h5 class="light grey-text text-lighten-3">Combing latest materials on more classical styles.</h5>
        </div>
      </li>
      <li>
        <img src="https://webquoin.com/catalog/build/assets/nickels%20kitchens/oseen-kitchen-1024x579.jpg">
        <div class="caption right-align">
          <h3>Clean modern kitchens</h3>
          <h5 class="light grey-text text-lighten-3">Clean integrated handles accross all cabinets</h5>
        </div>
      </li>
    </ul>
    <ul class="indicators"><li class="indicator-item"></li><li class="indicator-item active"></li><li class="indicator-item"></li></ul>
  </div>
  `
})
export class SliderComponent implements AfterViewInit {
  @ViewChild('slider', { read: ElementRef })
  slider: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    M.Slider.init(this.slider.nativeElement, {});
  }
}
