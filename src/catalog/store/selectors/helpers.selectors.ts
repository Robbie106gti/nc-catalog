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
        const spec = { 'main': []};
        const arr = [];
        if (cab.specifications) {
            arr.push('main');
            spec.main = cab.specifications;
        }
        cab.heights.forEach(el => {
            const v = cab.versions[el.id].specifications ? cab.versions[el.id].specifications : [];
            spec[el.id] = v;
            if (v.length > 0) { arr.push(el.id); }
        });
        arr.map(a => {
            spec[a] = spec[a].map(id => specs[id]);
        });
        spec['v'] = router.state.params.Version ? router.state.params.Version : 'main';
        // console.log(spec, arr);
        return spec;

        /* let specifications = cab.specifications ? cab.specifications : [];
        if (router.state.params.Version && cab.versions[router.state.params.Version].specifications) {
            specifications = specifications.concat(cab.versions[router.state.params.Version].specifications);
        }
        if (specifications.length === undefined) { return []; }
        return specifications.map(cabSpec => specs[cabSpec]); */
    }
);

export const getRouterParams = createSelector(fromRoot.getRouterState, (router) => router.state.params );

export const getCabIWHDs = createSelector(
    getHelperIWHDs,
    fromRoot.getRouterState,
    fromStore.getSelectedCabinetItem,
    (iwhds, router, cab) => {
        const arr = ['increments', 'depths', 'heights', 'widths'];
        const ty = [];
        const iwhd = { 'main': []};
        if (cab.iwhd) {
            ty.push('main');
            arr.forEach(a => {
                if (cab.iwhd[a]) { iwhd.main.push(cab.iwhd[a]); }
            });
        }
        cab.heights.forEach(el => {
            if (cab.versions[el.id].iwhd) {
                ty.push(el.id);
                iwhd[el.id] = [];
                arr.forEach(a => {
                    if (cab.versions[el.id].iwhd[a]) {
                        iwhd[el.id].push(cab.versions[el.id].iwhd[a]);
                    }
                });
            }
        });
        ty.map(a => {
            iwhd[a] = iwhd[a].map(id => iwhds[id]);
        });
        iwhd['v'] = router.state.params.Version ? router.state.params.Version : 'main';
        // console.log(iwhd, ty);
        return iwhd;

/*         const fish = new Array();
        let width = 'default';
        let height = 'default';
        let depth = 'default';
        let incre = 'SKR683fyZIN2ndh9C1as';
        if (cab.iwhd) {
            width = cab.iwhd.widths ? cab.iwhd.widths : width;
            height = cab.iwhd.heights ? cab.iwhd.heights : height;
            depth = cab.iwhd.depths ? cab.iwhd.depths : depth;
            incre = cab.iwhd.increments ? cab.iwhd.increments : incre;
        }
        if (router.state.params.Version && cab.versions[router.state.params.Version].iwhd) {
            width = cab.versions[router.state.params.Version].iwhd.widths ? cab.versions[router.state.params.Version].iwhd.widths : width;
            height = cab.versions[router.state.params.Version].iwhd.heights ? cab.versions[router.state.params.Version].iwhd.heights : height;
            depth = cab.versions[router.state.params.Version].iwhd.depths ? cab.versions[router.state.params.Version].iwhd.depths : depth;
            incre = cab.versions[router.state.params.Version].iwhd.increments ? cab.versions[router.state.params.Version].iwhd.increments : incre;
        }
        const array = [ incre, depth, height, width ];
        if (array.length === 0) { return []; }
        array.map(i => i !== 'default' ? fish.push(iwhds[i]) : null);
        return fish; */
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
        if (note.length === undefined) { return []; }
        return note.map(n => notes[n]);
    }
);

export const getCabAddons = createSelector(
    getHelperAddons,
    fromRoot.getRouterState,
    fromStore.getSelectedCabinetItem,
    (addons, router, cab) => {
        let addon = cab.addons ? cab.addons : [];
        if (router.state.params.Version && cab.versions[router.state.params.Version].addons) {
            addon = addon.concat(cab.versions[router.state.params.Version].addons);
        }
        if (addon.length === undefined) { return []; }
        return addon.map(n => addons[n]);
    }
);
