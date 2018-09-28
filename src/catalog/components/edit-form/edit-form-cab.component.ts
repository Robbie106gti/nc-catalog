import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
declare var M: any;

@Component({
  selector: 'edit-form-cab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-form-cab.component.html',
  styles: [
    `
      .modal {
        z-index: 100;
        display: block !important;
      }
      .modal.bottom-sheet {
        height: 87%;
        max-height: 87%;
        bottom: auto !important;
      }
    `
  ]
})
export class EditFormCabComponent implements AfterViewInit {
  form: FormGroup;
  @Input()
  content: any;
  @Input()
  user: any;
  @Input()
  pct: number;
  @Input()
  pctfile: string;
  @Input()
  url: string;
  @Input()
  results$: Observable<any>;
  @Input()
  specials: any;

  @Output()
  close = new EventEmitter<boolean>();
  @Output()
  file = new EventEmitter<any>();
  @Output()
  update = new EventEmitter<any>();
  @Output()
  search = new EventEmitter<any>();
  @Output()
  remove = new EventEmitter<any>();

  cat: string;
  version: string;

  @ViewChildren('tab', { read: ElementRef })
  elemsTab: QueryList<ElementRef>;

  @ViewChild('modal1', { read: ElementRef })
  elModal1: ElementRef;

  @ViewChildren('modals', { read: ElementRef })
  elemsModal: QueryList<ElementRef>;
  instance: any;

  constructor(private fb: FormBuilder) {
    this.ToEdit();
    this.createForm();
    this.version = 'main';
  }

  ngAfterViewInit(): void {
    // console.log({ modals: this.elemsModal, tabs: this.elemsTab, modal: this.elModal1 });
    const modals = M.Modal.init(this.elemsModal, { dismissible: false });
    const tabs = M.Tabs.init(this.elemsTab, {});
    this.instance = M.Modal.getInstance(this.elModal1.nativeElement);
  }

  setId(id) {
    this.version = id;
  }

  setItem(item) {
    this.cat = item;
  }

  createForm() {
    this.form = this.fb.group({
      description: [''],
      spec: [''],
      note: [''],
      specV: [''],
      noteV: ['']
    });
  }

  Search(value: string) {
    if (value.length > 1) {
      this.search.emit({ category: this.cat, value });
      // console.log(this.cat, value);
    }
  }

  imageUpload(event) {
    this.file.emit({ ...event, version: this.version });
  }

  ToEdit() {
    // this.instance.open();
  }

  onDes(event) {
    const up = {
      sub: 'Description',
      value: this.form.controls.description.value,
      version: 'item'
    };
    this.update.emit({ ...up });
  }

  Add(event) {
    // console.log({ sub: this.cat, value: event, version: this.version });
    this.update.emit({ sub: this.cat, value: event, version: this.version });
  }

  Remove(r) {
    if (r.sub === 'iwhd') {
      this.specials.iwhd[this.version] = this.specials.iwhd[this.version].filter(item => item.id !== r.id);
    } else {
      this.specials.specs[this.version] = this.specials.specs[this.version].filter(item => item.id !== r.id);
    }
    this.remove.emit({ ...r, toDo: 'remove', version: this.version, user: this.user });
  }

  Closed() {
    this.close.emit(true);
  }

  OffOn(event) {
    this.update.emit({ ...event, sub: 'OnOff' });
  }
}
