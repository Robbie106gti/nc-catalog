import * as fromSearch from '../actions/search.action';

export interface SearchState {
  results: { [id: string]: any };
  query: { value: string; category: string };
  loaded: boolean;
  loading: boolean;
}

export const initialState: SearchState = {
  results: {},
  query: { value: null, category: null },
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromSearch.SearchAction): SearchState {
  switch (action.type) {
    case fromSearch.SEARCH_SOP: {
      const query = { value: action.payload, category: null };
      return {
        ...state,
        loading: true,
        query
      };
    }

    case fromSearch.SEARCH_SOP_SUCCESS: {
      const search = Object.values(action.payload);
      const query = state.query;
      // console.log({search, query})
      // tslint:disable-next-line:no-inferrable-types
      let max: number = 25;
      const results = new Array();
      search.forEach(el => {
        if (el.search) {
          el.search.map((item, index) => {
            const str = item.title.toLowerCase();
            const arr = item.content.length >= 0 ? item.content.map(i => i.toLowerCase()) : [];
            arr.push(str);
            // console.log(arr)
            // tslint:disable-next-line:triple-equals
            if (max == 0) {
              return;
            }
            arr.forEach(param => {
              if (param.includes(query.value.toLowerCase())) {
                results.push(item);
                max--;
              }
            }
              )
          });
        }
      });

      return {
        ...state,
        loading: false,
        loaded: true,
        results
      };
    }

    case fromSearch.SEARCH_SOP_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getSearchResults = (state: SearchState) => state.results;
export const getSearchQuery = (state: SearchState) => state.query;
export const getSearchLoading = (state: SearchState) => state.loading;
export const getSearchLoaded = (state: SearchState) => state.loaded;
