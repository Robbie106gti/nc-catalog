import * as fromEdit from '../actions/edit.action';

export interface EditState {
  item: any;
  loaded: boolean;
}

export const initialState: EditState = { item: {}, loaded: false };

export function reducer(state = initialState, action: fromEdit.EditAction): EditState {
  switch (action.type) {
    case fromEdit.LOAD_EDIT: {
      // console.log(action);
      const item = action.payload;
      return { ...state, loaded: true, item };
    }

    case fromEdit.EDITED: {
      return { ...state, loaded: false, item: {} };
    }

    case fromEdit.UPDATE_TITLE: {
      const item = action.payload;
      return { ...state, loaded: false, item };
    }
  }

  return state;
}

export const getEditItem = (state: EditState) => state.item;
export const getEditLoaded = (state: EditState) => state.loaded;
