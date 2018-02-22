import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRoot from '../../../app/store';
import * as fromStore from './index';

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

export const getCabSpecs = createSelector(
    getHelperSpecs,
    fromRoot.getRouterState,
    fromStore.getSelectedCabinetItem,
    (specs, router, cab) => {
        let specifications = cab.specifications;
        if (router.state.params.Version && cab.versions[router.state.params.Version].specifications) { 
            specifications = specifications.concat(cab.versions[router.state.params.Version].specifications);
        }
        return specifications.map(cabSpec => specs[cabSpec]);
    }
);

export const getRouterParams = createSelector(fromRoot.getRouterState, (router) => router.state.params );

export const getCabIWHDs = createSelector(
    getHelperIWHDs,
    fromRoot.getRouterState,
    fromStore.getSelectedCabinetItem,
    (iwhds, router, cab) => {
        let array;
        if (router.state.params.Version) {
            const width2 = cab.versions[router.state.params.Version].widths ? cab.versions[router.state.params.Version].widths : cab.iwhd.widths;
            const height2 = cab.versions[router.state.params.Version].heights ? cab.versions[router.state.params.Version].heights :cab.iwhd.heights;
            const depth2 = cab.versions[router.state.params.Version].depths ? cab.versions[router.state.params.Version].depths : cab.iwhd.depths;
            const incre2 = cab.versions[router.state.params.Version].increments ? cab.versions[router.state.params.Version].increments : cab.iwhd.increments;
            array = [ incre2, width2, height2, depth2];
        } else {
            const width = cab.iwhd.widths;
            const height = cab.iwhd.heights;
            const depth = cab.iwhd.depths;
            const incre = cab.iwhd.increments;
            array = [ incre, width, height, depth];
        }
        return array.map(i => iwhds[i]);
    }
);

export const getCabNotes = createSelector(
    getHelperNotes,
    fromRoot.getRouterState,
    fromStore.getSelectedCabinetItem,
    (notes, router, cab) => {
        let note = cab.notes ? cab.notes : [];
        if (router.state.params.Version && cab.versions[router.state.params.Version].notes) { 
            note = note.concat(cab.versions[router.state.params.Version].notes);
        }
        if(note.length === 0) { return; }
        return note.map(n => notes[n]);
    }
);

export const getCabAddons = createSelector(
    getHelperAddons,
    fromRoot.getRouterState,
    fromStore.getSelectedCabinetItem,
    (addons, router, cab) => {
        let addon = cab.addons;
        if (router.state.params.Version && cab.versions[router.state.params.Version].addons) { 
            addon = addon.concat(cab.versions[router.state.params.Version].addons);
        }
        return addon.map(n => addons[n]);
    }
);

