import * as fromCabinets from '../actions/cabinets.action';
import { Cabinets } from '../../models/cabinets.model';
import { EditCab } from '../../models/edit-cab.model';
import * as common from '../../utils/common';

export interface CabinetsState {
  'base-cabinets': CabinetsLine;
  'base-channel-cabinets': CabinetsLine;
  'floating-vanity-cabinets': CabinetsLine;
  'tall-cabinets': CabinetsLine;
  'tall-channel-cabinets': CabinetsLine;
  'vanity-cabinets': CabinetsLine;
  'vanity-channel-cabinets': CabinetsLine;
  'wall-cabinets': CabinetsLine;
  'wall-channel-cabinets': CabinetsLine;
  'wardrobe-cabinets': CabinetsLine;
  'To Edit'?: EditCab;
  Upload?: any;
  Download?: any;
  load?: string;
  lastload?: string;
}

export interface CabinetsLine {
  entities: { [id: string]: Cabinets };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CabinetsState = {
  'base-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'base-channel-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'floating-vanity-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'tall-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'tall-channel-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'vanity-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'vanity-channel-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'wall-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'wall-channel-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  },
  'wardrobe-cabinets': {
    entities: {},
    loaded: false,
    loading: false
  }
};

export function reducer(state = initialState, action: fromCabinets.CabinetsAction): CabinetsState {
  switch (action.type) {
    case fromCabinets.LOAD_CABINETS: {
      const category = action.payload;
      return {
        ...state,
        load: category,
        [category]: { ...state[category], loading: true }
      };
    }

    case fromCabinets.LOAD_CABINETS_SUCCESS: {
      const category = action.payload;
      const entities = category.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: string]: Cabinets }, cat: Cabinets) => {
          return { ...entities, [common.makelink(cat.title)]: { ...cat, link: common.makelink(cat.title) } };
        },
        { ...state[category[0].sub].entities }
      );

      return {
        ...state,
        load: '',
        lastload: category[0].sub,
        [category[0].sub]: { entities, loaded: true, loading: false }
      };
    }

    case fromCabinets.LOAD_CABINETS_FAIL: {
      return {
        ...state,
        load: '',
        lastload: state.load,
        [state.load]: { loaded: false, loading: false }
      };
    }

    case fromCabinets.CREATE_EDIT_CAB: {
      const toEdit = action.payload;
      return {
        ...state,
        'To Edit': toEdit
      };
    }

    case fromCabinets.CREATE_EDIT_CAB: {
      return {
        ...state,
        'To Edit': null
      };
    }

    case fromCabinets.UPLOAD_CABINET: {
      const upload = action.payload;
      return {
        ...state,
        Upload: { ...upload, status: { bytesTransferred: 0, totalBytes: 100 } }
      };
    }

    case fromCabinets.UPLOAD_CABINET_FAIL: {
      const uploadErr = action.payload;
      return {
        ...state,
        Upload: { ...state.Upload, error: uploadErr }
      };
    }

    case fromCabinets.UPLOAD_CABINET_SUCCESS: {
      return {
        ...state,
        Upload: { ...state.Upload, status: action.payload }
      };
    }

    case fromCabinets.DOWNLOAD_URL: {
      const url = action.payload.url;
      return {
        ...state,
        Download: url
      };
    }
  }

  return state;
}

export const getCabinetsEntities = (state: CabinetsLine) => (state ? state.entities : {});
export const getCabinetsLoading = (state: CabinetsLine) => state.loading;
export const getCabinetsLoaded = (state: CabinetsLine) => state.loaded;
