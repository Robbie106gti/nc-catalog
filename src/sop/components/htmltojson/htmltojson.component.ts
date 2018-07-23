import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'htmltojson',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  hello from HTMLtojson <br>
  <div class="input-field col s12">
  <textarea #html id="textarea1" class="materialize-textarea" data-length="450" (keyup.enter)="ConvertHtml(html.value)" (blur)="ConvertHtml(html.value)"></textarea>
  <label for="textarea1">Textarea</label>
</div>
  `
})
export class HtmlToJsonComponent {
  @Output() html = new EventEmitter<any>();
  ConvertHtml(value) {
    this.html.emit(value);
  }
}
