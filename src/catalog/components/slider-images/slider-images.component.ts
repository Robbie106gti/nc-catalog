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
    <div class="card">
        <div class="carousel carousel-slider" data-indicators="true">
            <div class="carousel-item">
                <h2 class="padding">Base Full Door 18" high</h2>
                <img src="https://webquoin.com/catalog/images/BFD__18.jpg" alt='Base Full Door 18" high'
                        class="responsive-img materialboxed" data-caption='Base Full Door 18" high'>
            </div>
            <div class="carousel-item">
                <h2 class="padding">Drawing Base Full Door 18" high</h2>
                <img src="https://webquoin.com/catalog/images/GIFs/Custom/Base/BFD__18.gif" alt='Drawing Base Full Door 18" high'
                    class="responsive-img materialboxed" data-caption='Drawing Base Full Door 18" high'>
            </div>
        </div>
    </div>
    `,
    styles: [`
    .carousel .indicators .indicator-item {
            background-color: #444 !important;
            color: #444 !important;
        }
    `]
  })
  export class SliderImagesComponent {
    @Input() content: any;

    constructor () {
        $(document).ready(function(){
            $('.carousel.carousel-slider').carousel({fullWidth: true});
            $('.materialboxed').materialbox();
          });
    }
  }
