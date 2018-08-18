import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.html',
  styleUrls: ['../search.scss']
})
export class ResultsComponent {
  @Input()
  results: any;
  @Input()
  loaded: boolean;
  @Input()
  loading: boolean;
  @Input()
  search: string;
}
