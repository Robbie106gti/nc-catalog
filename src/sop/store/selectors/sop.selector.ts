import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromSop from '../reducers/sop.reducer';
import * as fromCat from './cat.selector';

export const getSops = createSelector(fromFeature.getSopsState, (state: fromFeature.SopsState) => state.sop);

export const getSopsCat = createSelector(
  getSops,
  fromCat.getSelectedCat,
  (subs, cat) => (cat ? subs.entities[cat.id] : null)
);

export const getSelectedSops = createSelector(
  getSopsCat,
  entities => (entities ? Object.keys(entities).map(id => entities[id]) : [])
);

export const getSelectedSop = createSelector(getSopsCat, fromRoot.getRouterState, (entities, router) => {
  const Id = router.state.params.Item;
  return Id ? entities[Id] : {};
});
