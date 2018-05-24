import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

declare var $: any;
declare var M: any;

@Component({
  selector: 'spec-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spec-form.component.html',
  styles: [
    `
  a.active {
    font-weight: 450 !important;
    background-color: #efebe9 !important;
  }
.tabs>li.indicator {
    height: 3px !important;
    background-color: #efebe9 !important;
}
    .row {
      padding: 0.5rem !important;
    }
.modal-content {
  position: fixed;
  left: 5rem;
  right: 5rem;
  top: 5rem;
  padding: 0.5rem;
  max-height: 80vh;
  border-radius: 0.5rem;
  border: rgba(85, 97, 104, 0.6) solid 1px;
  background-color: rgb(255, 255, 255);
}

.image-modal {
  height: 100% !important;
  width: 100% !important;
  position: fixed !important;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(85, 97, 104, 0.6);
}`
  ]
})
export class SpecFormComponent {
  @Input() iwhd: any;
  @Input() specs: any;
  @Input() content: any;
  @Input() open: Observable<boolean>;
  @Input() results$: Observable<any>;
  @Output() search = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  cat: string;
  id: string; // tab id
  sId: string; // search id

  constructor() {
    document.addEventListener('DOMContentLoaded', function() {
      const options = {};
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, options);
    });
    document.addEventListener('DOMContentLoaded', function() {
      const options = {};
      const el = document.querySelectorAll('.tab');
      const instance = M.Tabs.init(el, options);
    });
    this.id = 'main';
    M.AutoInit();
  }

  setId(id: string) {
    this.id = id;
  }

  Search(value: string, str: string, id: string) {
    if (value.length > 1) {
      this.cat = str;
      this.sId = id;
      this.search.emit({ category: str, value });
    }
  }

  Update(r) {
    if (!this.iwhd[this.sId] || !this.specs[this.sId]) {
      this.specs = { ...this.specs, [this.sId]: [] };
      this.iwhd = { ...this.iwhd, [this.sId]: [] };
    }
    if (r.sub === 'iwhd') {
      this.iwhd[this.sId].push(r);
    } else {
      this.specs[this.sId].push(r);
    }
    this.update.emit({ ...r, version: this.sId });
  }

  Remove(r) {
    if (r.sub === 'iwhd') {
      this.iwhd[this.sId] = this.iwhd[this.sId].filter(item => item.id !== r.id);
    } else {
      this.specs[this.sId] = this.specs[this.sId].filter(item => item.id !== r.id);
    }
    this.remove.emit({ ...r, toDo: 'remove', version: this.sId });
  }
  Close() {
    this.open = of(false);
  }
}
