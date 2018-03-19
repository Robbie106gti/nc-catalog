import * as fromSearch from '../actions/search.action';

export interface IconState {
  icons: any;
}

export const initialState: IconState = {
  icons: [
    {
      icon: 'account_circle',
      ui: true
    },
    {
      icon: 'add',
      ui: true
    },
    {
      icon: 'apps',
      ui: true
    },
    {
      icon: 'arrow_back',
      ui: true
    },
    {
      icon: 'arrow_forward',
      ui: true
    },
    {
      icon: 'collections_bookmark',
      ui: true
    },
    {
      icon: 'close',
      ui: true,
      crud: true
    },
    {
      icon: 'create',
      ui: true,
      crud: true
    },
    {
      icon: 'error',
      ui: true,
      crud: true
    },
    {
      icon: 'announcement',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'assignment',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'assessment',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'format_quote',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'format_paint',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'gavel',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'grain',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    },
    {
      icon: 'label',
      ui: true,
      sop: true,
      mds: true,
      cat: true
    }
  ]
};

export function reducer(
  state = initialState
): IconState {
  return state;
}

export const getIcons = (state: IconState) => state.icons;
