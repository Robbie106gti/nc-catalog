import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromHelpers from '../reducers/helpers.reducer';

export const getHelperState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.helpers
);

export const getHelperNoteState = createSelector(
    getHelperState,
    (helpers) => {
        // console.log(cabinets, router);
        return helpers['notes'];
    }
);

export const getHelperNoteLoaded = createSelector(
    getHelperNoteState,
    (notes) => {
        return notes.loaded;
    }
);

export const getHelperNoteLoading = createSelector(
    getHelperNoteState,
    (notes) => {
        return notes.loading;
    }
);

export const getHelperNotes = createSelector(
    getHelperNoteState,
    (notes) => {
        return notes.entities;
    }
);

export const getHelperSpecState = createSelector(
    getHelperState,
    (helpers) => {
        // console.log(cabinets, router);
        return helpers['specifications'];
    }
);

export const getHelperSpecLoaded = createSelector(
    getHelperSpecState,
    (spec) => {
        // console.log(cabinets, router);
        return spec.loaded;
    }
);

export const getHelperSpecLoading = createSelector(
    getHelperSpecState,
    (spec) => {
        // console.log(cabinets, router);
        return spec.loading;
    }
);

export const getHelperSpecs = createSelector(
    getHelperSpecState,
    (spec) => {
        // console.log(cabinets, router);
        return spec.entities;
    }
);

export const getHelperIWHDState = createSelector(
    getHelperState,
    (helpers) => {
        // console.log(cabinets, router);
        return helpers['iwhd'];
    }
);

export const getHelperIWHDLoaded = createSelector(
    getHelperIWHDState,
    (iwhd) => {
        // console.log(cabinets, router);
        return iwhd.loaded;
    }
);

export const getHelperIWHDLoading = createSelector(
    getHelperIWHDState,
    (iwhd) => {
        // console.log(cabinets, router);
        return iwhd.loading;
    }
);

export const getHelperIWHDs = createSelector(
    getHelperIWHDState,
    (iwhd) => {
        // console.log(cabinets, router);
        return iwhd.entities;
    }
);

export const getHelperAddonsState = createSelector(
    getHelperState,
    (helpers) => {
        // console.log(cabinets, router);
        return helpers['addons'];
    }
);

export const getHelperAddonsLoaded = createSelector(
    getHelperAddonsState,
    (addons) => {
        // console.log(cabinets, router);
        return addons.loaded;
    }
);

export const getHelperAddonsLoading = createSelector(
    getHelperAddonsState,
    (addons) => {
        // console.log(cabinets, router);
        return addons.loading;
    }
);

export const getHelperAddons = createSelector(
    getHelperAddonsState,
    (addons) => {
        // console.log(cabinets, router);
        return addons.entities;
    }
);

