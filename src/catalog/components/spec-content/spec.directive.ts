import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as fromServices from '../../services';

@Directive({
  selector: '[appSpecRetrieval]'
})
export class SpecRetDirective implements AfterViewInit {
  constructor(private el: ElementRef, private firestore: fromServices.FirestoreService) {}
  @Input()
  uid: string;
  @Input()
  where: string;

  ngAfterViewInit() {
    console.log(this.uid, this.where);
  }
}
