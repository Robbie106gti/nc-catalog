import * as fromSop from '../actions/sop.action';

export interface SopState {
  entities: { [id: string]: SopsLine};
  load: string;
}

export interface SopsLine {
  [id: string]: { [id: string]: any };
}

export const initialState: SopState = {
  entities: {},
  load: ''
};

export function reducer(
  state = initialState,
  action: fromSop.SopAction
): SopState {
  switch (action.type) {

    case fromSop.LOAD_SOPS: {
      const load: string = action.payload.id;
      const entities = { [load]: { [load]: action.payload } };
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
      const cat = state.load;
      let entity = {};
      items.map(item => {
        entity = { ...entity, [item.title]: item};
      });
      const entities = { ...state.entities, [cat]: entity };
      return {
        ...state,
        entities
      };
    }

    case fromSop.ADD_SOP_SUCCESS: {
      return {
        ...state,
      };
    }

    case fromSop.UPDATE_SOP_TI: {
      return {
        ...state,
      };
    }

    case fromSop.UPDATE_SOP_TI_FAIL: {
      return {
        ...state,
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
        state.entities = {...state.entities, [newItem.title]: newItem };
      return {
        ...state,
      };
    }
  }

  return state;
}

export const getSopLoad = (state: SopState) => state.load;
