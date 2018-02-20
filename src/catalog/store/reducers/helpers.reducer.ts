import * as fromHelpers from '../actions/helpers.action';

export interface HelperState {
    'addons': Line;
    'iwhd': Line;
    'notes': Line;
    'specifications': Line;
    load?: string;
    lastload?: string;
  }

  export interface Line {
    entities: { [id: string]: any };
    loaded: boolean;
    loading: boolean;
  }

export const initialState: HelperState = {
    'addons': {
        entities: {},
        loaded: false,
        loading: false
    },
    'iwhd': {
        entities: {},
        loaded: false,
        loading: false
    },
    'notes': {
        entities: {},
        loaded: false,
        loading: false
    },
    'specifications': {
        entities: {},
        loaded: false,
        loading: false
    }
};

export function reducer(
  state = initialState,
  action: fromHelpers.HelpersAction
): HelperState {
  switch (action.type) {
    case fromHelpers.LOAD_HELPERS: {
        const item = action.payload;
      return {
        ...state,
        load: item,
        [item]: { ...state[item], loading: true },
      };
    }

    case fromHelpers.LOAD_HELPERS_SUCCESS: {
        const item = action.payload;
        const entities = item.reduce(
          // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [cat.id]: {...cat}};
        },
        { ...state[item[0].sub].entities, });
  
        return {
          ...state,
          load: '',
          lastload: item[0].sub,
          [item[0].sub]: { entities, loaded: true, loading: false },
        };
      }
  
      case fromHelpers.LOAD_HELPERS_FAIL: {
        return {
          ...state,
          load: '',
          lastload: state.load,
          [state.load]: { loaded: false, loading: false },
        };
      }

    case fromHelpers.LOAD_HELPERS_ADDONS: {
        const item = 'addons';
      return {
        ...state,
        load: item,
        [item]: { ...state[item], loading: true },
      };
    }
    
    case fromHelpers.LOAD_HELPERS_SUCCESS_ADDONS: {
        const item = action.payload;
        const entities = item.reduce(
          // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [cat.id]: {...cat}};
        },
        { ...state[item[0].sub].entities, });
  
        return {
          ...state,
          load: '',
          lastload: item[0].sub,
          [item[0].sub]: { entities, loaded: true, loading: false },
        };
      }
  
      case fromHelpers.LOAD_HELPERS_FAIL_ADDONS: {
        return {
          ...state,
          load: '',
          lastload: state.load,
          [state.load]: { loaded: false, loading: false },
        };
      }

    case fromHelpers.LOAD_HELPERS_IWHD: {
        const item = 'iwhd';
      return {
        ...state,
        load: item,
        [item]: { ...state[item], loading: true },
      };
    }
    
    case fromHelpers.LOAD_HELPERS_SUCCESS_IWHD: {
        const item = action.payload;
        const entities = item.reduce(
          // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [cat.id]: {...cat}};
        },
        { ...state[item[0].sub].entities, });
  
        return {
          ...state,
          load: '',
          lastload: item[0].sub,
          [item[0].sub]: { entities, loaded: true, loading: false },
        };
      }
  
      case fromHelpers.LOAD_HELPERS_FAIL_ADDONS: {
        return {
          ...state,
          load: '',
          lastload: state.load,
          [state.load]: { loaded: false, loading: false },
        };
      }

    case fromHelpers.LOAD_HELPERS_NOTES: {
        const item = 'notes';
      return {
        ...state,
        load: item,
        [item]: { ...state[item], loading: true },
      };
    }
    
    case fromHelpers.LOAD_HELPERS_SUCCESS_NOTES: {
        const item = action.payload;
        const entities = item.reduce(
          // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [cat.id]: {...cat}};
        },
        { ...state[item[0].sub].entities, });
  
        return {
          ...state,
          load: '',
          lastload: item[0].sub,
          [item[0].sub]: { entities, loaded: true, loading: false },
        };
      }
  
      case fromHelpers.LOAD_HELPERS_FAIL_NOTES: {
        return {
          ...state,
          load: '',
          lastload: state.load,
          [state.load]: { loaded: false, loading: false },
        };
      }

    case fromHelpers.LOAD_HELPERS_SPEC: {
        const item = 'specifications';
      return {
        ...state,
        load: item,
        [item]: { ...state[item], loading: true },
      };
    }
    
    case fromHelpers.LOAD_HELPERS_SUCCESS_SPEC: {
        const item = action.payload;
        const entities = item.reduce(
          // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: any }, cat: any) => {
          return { ...entities, [cat.id]: {...cat}};
        },
        { ...state[item[0].sub].entities, });
  
        return {
          ...state,
          load: '',
          lastload: item[0].sub,
          [item[0].sub]: { entities, loaded: true, loading: false },
        };
      }
  
      case fromHelpers.LOAD_HELPERS_FAIL_SPEC: {
        return {
          ...state,
          load: '',
          lastload: state.load,
          [state.load]: { loaded: false, loading: false },
        };
      }
  }

  return state;
}

export const getHelpersEntities = (state: Line) => state.entities;
export const getHelpersLoading = (state: Line) => state.loading;
export const getHelpersLoaded = (state: Line) => state.loaded;
