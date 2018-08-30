import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'sop-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './results.html',
  styleUrls: ['../search.scss']
})
export class SopResultsComponent {
  @Input()
  results: any;
  @Input()
  loaded: boolean;
  @Input()
  loading: boolean;
  @Input()
  search: string;
}
