import * as fromSop from '../actions/sop.action';
import * as common from '../../utils/common';

export interface SopState {
  entities: any;
  load: string;
}

export interface SopsLine {
  [id: string]: { [id: string]: any };
}

export const initialState: SopState = {
  entities: {},
  load: ''
};

export function reducer(state = initialState, action: fromSop.SopAction): SopState {
  switch (action.type) {
    case fromSop.LOAD_SOPS: {
      // console.log(state);
      const load: string = action.payload.id;
      const entities = { ...state.entities, [load]: { [load]: action.payload } };
      return {
        ...state,
        load,
        entities
      };
    }

    case fromSop.LOAD_SOPS_FAIL: {
      return {
        ...state,
        load: 'fail'
      };
    }

    case fromSop.LOAD_SOPS_SUCCESS: {
      const items = action.payload;
      items.sort(function (a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      const cat = state.load;
      let entity = {};
      items.map(item => {
        entity = { ...entity, [common.makelink(item.title)]: { ...item, link: common.makelink(item.title) } };
      });
      const entities = { ...state.entities, [cat]: entity };
      return {
        ...state,
        entities
      };
    }

    case fromSop.ADD_SOP_SUCCESS: {
      return {
        ...state
      };
    }

    case fromSop.UPDATE_SOP_TI: {
      return {
        ...state
      };
    }

    case fromSop.UPDATE_SOP_TI_FAIL: {
      return {
        ...state
      };
    }

    case fromSop.UPDATE_SOP_TI_SUCCESS: {
      const item = action.payload;
      const newItem = action.payload.edit;
      newItem.title = item.title;
      newItem.image = item.image;
      newItem.updatedBy = item.updatedBy;
      delete state.entities[item.edit.idCat][item.edit.titleOld];
      delete newItem.titleOld;
      state.entities = {
        ...state.entities,
        [common.makelink(newItem.title)]: { ...newItem, link: common.makelink(newItem.title) }
      };
      return {
        ...state
      };
    }

    case fromSop.MOVE_SOP_DELETE_SUCCESS: {
      // console.log(action)
      const sop = action.payload;
      const del = sop.item_movefrom_id && sop.link ? true : false;
      del ? delete state.entities[sop.item_movefrom_id][sop.link] : null;
      return {
        ...state
      };
    }

    case fromSop.SOP_DELETE_SUCCESS: {
      const sop = action.payload.edit;
      const del = sop.idCat && sop.link ? true : false;
      del ? delete state.entities[sop.idCat][sop.link] : null;
      return {
        ...state
      };
    }
  }

  return state;
}

export const getSopLoad = (state: SopState) => state.load;
