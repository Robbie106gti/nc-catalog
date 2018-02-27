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
    <div class="card" *ngIf="param.Version; else cover">
        <div class="carousel carousel-slider" data-indicators="true">
            <div class="carousel-item">
                <h2 class="padding">Spec {{ content.title}} {{ content.versions[param.Version].title }}</h2>
                <span *ngIf="content.versions[param.Version].images; else icon">
                    <img [src]="content.versions[param.Version].images.spec.image"
                    [alt]="content.versions[param.Version].images.spec.image"
                    class="responsive-img materialboxed">
                </span>
            </div>
            <div class="carousel-item">
                <h2 class="padding">{{ content.title}} {{ content.versions[param.Version].title }}</h2>
                <span *ngIf="content.versions[param.Version].images; else icon">
                    <img [src]="content.versions[param.Version].images.image.image"
                    [alt]="content.versions[param.Version].images.image.image"
                    class="responsive-img materialboxed" >
                </span>
            </div>
        </div>
    </div>

    <ng-template #cover>
    <div class="card">
        <div class="carousel carousel-slider" data-indicators="true">
            <div class="carousel-item">
                <h2 class="padding">{{ content.title }}</h2>
                <img [src]="content.image" [alt]="content.title"
                    class="responsive-img materialboxed" >
            </div>
        </div>
    </div>
    </ng-template>

    <ng-template #icon>
        <i class="material-icons large">image</i>
    </ng-template>
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
    @Input() param: any;

    constructor () {
        $(document).ready(function(){
            $('.carousel.carousel-slider').carousel({fullWidth: true});
            $('.materialboxed').materialbox();
          });
    }
  }
