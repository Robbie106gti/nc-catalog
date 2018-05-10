import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';

import { Categories } from '../../models/categories.model';
import { getFilterState, getFilterMaterials } from '../selectors/search.selectors';

export const getCategoriesState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.categories
);

export const getCategoriesLineState = createSelector(
  getCategoriesState,
  fromRoot.getRouterState,
  (categories, router) => {
    // console.log(categories, router);
    return categories[router.state.params.Cat];
  }
);

export const getCategoriesEntities = createSelector(getCategoriesLineState, fromCategories.getCategoriesEntities);

export const getSelectedCategoryLine = createSelector(
  getCategoriesEntities,
  fromRoot.getRouterState,
  (entities, router): Categories => {
    const Id = router.state.params.Cat;
    return router.state && entities[Id];
  }
);

export const getCategories = createSelector(
  getCategoriesEntities,
  fromRoot.getUserRoles,
  (entities, roles): Categories[] => {
    let list = Object.keys(entities).map(id => entities[id]);
    list = roles.dealer ? list.filter(li => li['active']) : list;
    return list;
  }
);

export const getDoorsCategory = createSelector(
  getCategoriesEntities,
  fromRoot.getUserRoles,
  getFilterState,
  getFilterMaterials,
  (entities, roles, filter, filtered): Categories[] => {
    const material = new Array();
    const matfiltered = [];
    let list = Object.keys(entities).map(id => entities[id]);
    console.log(filter, filtered, material);
    if (filter) {
      Object.entries(filtered).map(([key, value]) => {
        console.log(key, value);
        if (value) material.push(key);
      });
      list.filter(li => {
        const materials = li['materials'] ? li['materials'] : ['none'];
        let addTo = false;
        material.forEach(mat => {
          if (!materials.includes(mat)) return;
          addTo = true;
        });
        if (addTo) matfiltered.push(li);
      });
      console.log(filter, filtered, material);
    }
    list = filter ? matfiltered : list;
    list = roles.dealer ? list.filter(li => li['active']) : list;
    const slab = list.filter(door => door['doorstyle'] === 'slab face door');
    const recessed = list.filter(door => door['doorstyle'] === 'recessed panel door');
    const raised = list.filter(door => door['doorstyle'] === 'raised panel door');
    const metal = list.filter(door => door['doorstyle'] === 'metal door');
    const doors: any = {
      slab,
      recessed,
      raised,
      metal
    };
    return doors;
  }
);

export const getCategoriesLoaded = createSelector(getCategoriesLineState, fromCategories.getCategoriesLoaded);

export const getCategoriesLoading = createSelector(getCategoriesLineState, fromCategories.getCategoriesLoading);

export const getSelectedCategoryItem = createSelector(getCategories, fromRoot.getRouterState, (entities, router) => {
  let entity;
  entities.map(en => {
    if (en.title === router.state.params.Item) {
      return (entity = en);
    }
  });
  return entity;
});

export const getSelectedCatImagesItem = createSelector(getCategories, fromRoot.getRouterState, (entities, router) => {
  let entity;
  const images = {
    default: {
      title: null,
      image: null
    },
    spec: {
      title: null,
      image: null
    },
    array: []
  };
  entities.map(en => {
    if (en.title === router.state.params.Item) {
      return (entity = en);
    }
  });
  let arrayId = 0;
  Object.keys(entity.images).map(id => {
    if (id === 'spec') {
      const defa = { image: entity.image, title: entity.title, arrayId };
      images.default = defa;
      images.array.push(defa);
      arrayId++;
      const spec = { image: entity.images[id].image, title: entity.images[id].title, arrayId };
      images.spec = spec;
    }
    if (entity.images[id].imageVG) {
      images.array.push({ title: entity.images[id].title + ' VGM', image: entity.images[id].imageVG });
      arrayId++;
    }
    if (entity.images[id].imageHG) {
      images.array.push({ title: entity.images[id].title + ' HGM', image: entity.images[id].imageHG });
      arrayId++;
    }
    images.array.push(entity.images[id]);
    arrayId++;
  });
  return images;
});
