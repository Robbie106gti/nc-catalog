import {
  Component,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';

declare var M: any;

@Component({
  selector: 'add-custom',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card padding unset" *ngIf="content?.addons">
        <h4>Popular Attachments and Applications:</h4>
        <ul  #collapsible class="collapsible popout" data-collapsible="accordion">
            <li *ngFor="let addon of content.addons">
                <div class="collapsible-header"><addon-title [uid]="addon"></addon-title></div>
                <div class="collapsible-body"><addon-content [uid]="addon"></addon-content></div>
            </li>
            <li *ngFor="let addon of content.versions[v]?.addons">
                <div class="collapsible-header"><addon-title [uid]="addon"></addon-title></div>
                <div class="collapsible-body"><addon-content [uid]="addon"></addon-content></div>
            </li>
            <li>
                <div class="collapsible-header"><i class="material-icons">import_contacts</i>Bottom cabinet - Application (example)</div>
                <div class="collapsible-body">
                    <span><b>Bottom cabinet</b> the recommended application for this panel is to apply it to the bottom of a cabinet</span>
                </div>
            </li>
        </ul>
   </div>
    `
})
export class AddCustomComponent implements AfterViewInit {
  @Input()
  content: any;
  @Input()
  v: any;
  @ViewChildren('collapsible', { read: ElementRef })
  elemsCollapsible: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    const elems = this.elemsCollapsible;
    elems.forEach(el => new M.Collapsible(el.nativeElement, {}));
  }
}
