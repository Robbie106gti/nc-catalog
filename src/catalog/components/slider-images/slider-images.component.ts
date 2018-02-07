import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
  } from '@angular/core';
  declare var $: any;
  declare var Materialize: any;

  @Component({
    // tslint:disable-next-line:component-selector
    selector: 'slider-images',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="card padding">
        <div class="slider">
            <ul class="slides">
                <li>
                    <img src="https://webquoin.com/catalog/images/BFD__18.jpg" alt='Base Full Door 18" high'
                        class="materialboxed" data-caption='Base Full Door 18" high'>
                    <div class="caption center-align">
                        <h3>Base Full Door 18" high</h3>
                        <h5 class="light grey-text text-lighten-3">Base Full Door 18" high</h5>
                    </div>
                </li>
                <li>
                    <img
                        src="https://webquoin.com/catalog/images/GIFs/Custom/Base/BFD__18.gif"
                        alt='Drawing Base Full Door 18" high'
                        class="materialboxed" data-caption='Drawing Base Full Door 18" high'
                        >
                    <div class="caption left-align">
                    <h3>Drawing Base Full Door 18" high</h3>
                    <h5 class="light grey-text text-lighten-3">Drawing Base Full Door 18" high</h5>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `,
  })
  export class SliderImagesComponent {
    @Input() content: any;

    constructor () {
        $(document).ready(function(){
            $('.slider').slider();
            $('.materialboxed').materialbox();
          });
    }
  }
