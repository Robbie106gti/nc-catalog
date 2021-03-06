import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';

import { Categories } from '../../models/categories.model';
import { getFilterState, getFilterMaterials } from '../selectors/search.selectors';
import * as common from '../../utils/common';

export const getCategoriesState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.categories
);

const getSelectedRouteCat = createSelector(
  fromRoot.getRouterState,
  router => (router.state.params.Cat ? router.state.params.Cat : null)
);

const getSelectedRouteItem = createSelector(
  fromRoot.getRouterState,
  router => (router.state.params.Item ? router.state.params.Item : null)
);

const getRouteParams = createSelector(
  fromRoot.getRouterState,
  router => (router.state.params ? router.state.params : null)
);

export const getCategoriesLineState = createSelector(
  getCategoriesState,
  getSelectedRouteCat,
  (categories, cat) => categories[cat]
);

export const getCategoriesEntities = createSelector(getCategoriesLineState, fromCategories.getCategoriesEntities);

export const getSelectedCategoryLine = createSelector(
  getCategoriesEntities,
  getSelectedRouteCat,
  (entities, cat): Categories => entities[cat]
);

///// BELOW is the one to get enities of category selected with dealer filter /////
export const getCategories = createSelector(
  getCategoriesState,
  getSelectedRouteCat,
  fromRoot.getUserRoles,
  (categories, cat, roles): Categories[] => {
    const entities = cat ? categories[cat].entities : null;
    // console.log(entities);
    if (entities == null) return entities;
    let list = Object.keys(entities).map(id => entities[id]);
    list = roles.dealer ? list.filter(li => li['active']) : list;
    return list;
  }
);

export const dealerVisisibleDoors = createSelector(
  getCategoriesState,
  getSelectedRouteCat,
  fromRoot.getUserRoles,
  filterByRoleDealer
);
export const filteredVisibleDoors = createSelector(
  dealerVisisibleDoors,
  getFilterState,
  getFilterMaterials,
  filterDoors
);
export const filteredAndOrganizedDoors = createSelector(filteredVisibleDoors, organizeDoors);

export const getCategoriesLoaded = createSelector(getCategoriesLineState, fromCategories.getCategoriesLoaded);

export const getCategoriesLoading = createSelector(getCategoriesLineState, fromCategories.getCategoriesLoading);

export const getSelectedCategoryItem = createSelector(
  getCategoriesEntities,
  getSelectedRouteItem,
  (entities, item) => entities[item]
);

export const catagoryImages = createSelector(getSelectedCategoryItem, fromRoot.getRouterState, organizeImages);

export const getMaterials = createSelector(fromRoot.getRouterState, getCategories, (router, entities) => {
  // console.log(router, entities);
  const options = router.state;
  entities =
    options.params.Version === 'materials' ? entities.filter(li => li['properties'][options.params.Item]) : entities;
  if (options.queryParams.mat) {
    const mat = common.prepareFirestore(options.queryParams.mat);
    // console.log(mat);
    entities = entities.filter(li => li['material'] === mat);
  }
  return entities;
});

////// Functions below this /////

function organizeImages(entity, router) {
  const images = {
    default: { title: null, image: null, arrayId: 0 },
    spec: { title: null, image: null, arrayId: 0 },
    array: []
  };
  if (!entity) return images;

  let arrayId = 0;
  let mat = router.state.queryParams.mat ? router.state.queryParams.mat : 'painted';
  mat = mat === 'euro materials' ? 'euro' : mat;
  const pc = router.state.queryParams.pc ? router.state.queryParams.pc + 'PC' : '';
  const wr = router.state.queryParams.wr === 'true' ? 'WR' : '';
  images.default.image = entity.image;
  images.default.title = entity.title;
  const concatDoor = mat + pc + wr;
  const ids = Object.keys(entity.images);
  let pickDoor = mat;
  let pickSpec = 'spec';
  if (ids.includes(concatDoor)) pickDoor = concatDoor;
  if (!entity.images[concatDoor] && entity.images[`${mat}${wr}`]) pickDoor = mat + wr;
  if (ids.includes('spec' + pc + wr)) pickSpec = pickSpec + pc + wr;
  if (!ids.includes('spec' + pc + wr) && ids.includes('spec' + wr)) pickSpec = pickSpec + wr;
  images.default = entity.images[pickDoor];

  ids.forEach((key, index) => {
    if (entity.images[key].imageVG) {
      images.array.push({ title: entity.images[key].title + ' VGM', image: entity.images[key].imageVG, arrayId });
      arrayId++;
    }
    if (entity.images[key].imageHG) {
      images.array.push({ title: entity.images[key].title + ' HGM', image: entity.images[key].imageHG, arrayId });
      arrayId++;
    }
    if (index === 0) {
      images.spec = entity.images[pickSpec];
    }
    if (key === pickSpec) images.spec.arrayId = arrayId;
    if (key === pickDoor) images.default.arrayId = arrayId;
    images.array.push({ ...entity.images[key], arrayId });
    arrayId++;
  });
  console.log(images, pickDoor, pickSpec);
  return images;
}

function filterDoors(entities, filter, filtered) {
  // console.log(filter, filtered);
  if (!filter) return entities;
  if (!entities) return entities;
  const material = new Array();
  const matfiltered = [];
  Object.entries(filtered).map(([key, value]) => {
    if (value) material.push(key);
  });
  if (material.length >= 1) {
    // console.log(material, filter, filtered);
    entities.filter(li => {
      const materials = li['materials'] ? li['materials'] : [];
      const tags = li.tags ? li.tags : [];
      const search = ['none'];
      materials.forEach(el => search.push(el.toLowerCase()));
      tags.forEach(el => search.push(el.toLowerCase()));
      // console.log(search);
      let addTo = 0;
      material.forEach(mat => {
        if (search.includes(mat)) addTo++;
      });
      // console.log(addTo, material.length);
      if (addTo === material.length) matfiltered.push(li);
    });
  }
  return matfiltered;
}

function organizeDoors(list) {
  if (list === null) return list;
  const slab = list.filter(door => door['doorstyle'] === 'slab face door');
  const recessed = list.filter(door => door['doorstyle'] === 'recessed panel door');
  const raised = list.filter(door => door['doorstyle'] === 'raised panel door');
  const metal = list.filter(door => door['doorstyle'] === 'metal door');
  const custom = list.filter(door => door['doorstyle'] === 'custom door');
  const doors: any = {
    slab,
    recessed,
    raised,
    metal,
    custom
  };
  return doors;
}

function filterByRoleDealer(categories, cat, roles) {
  let entities = cat ? categories[cat].entities : null;
  if (entities == null) return entities;
  entities = Object.keys(entities).map(id => entities[id]);
  entities = roles.dealer ? entities.filter(li => li['active']) : entities;
  return entities;
}
