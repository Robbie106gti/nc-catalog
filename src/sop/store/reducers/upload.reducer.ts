import * as fromUpload from '../actions/upload.action';

export interface UploadState {
  file: {};
  url?: string;
  fail?: boolean;
}

export const initialState: UploadState = {
  file: {}
};

export function reducer(
  state = initialState,
  action: fromUpload.UploadAction
): UploadState {
  switch (action.type) {

    case fromUpload.UPLOAD: {
      const file = { bytesTransferred: 0,  totalBytes: 100 };
      return {
        ...state,
        file
      };
    }

    case fromUpload.UPLOAD_SUCCESS: {
      const file = action.payload;
      return {
        ...state,
        file
      };
    }

    case fromUpload.UPLOAD_FAIL: {
      return {
        ...state,
        fail: true
      };
    }

    case fromUpload.UPLOAD_URL: {
      return {
        ...state
      };
    }

    case fromUpload.UPLOAD_URL_SUCCESS: {
      const url = action.payload.url;

      return {
        ...state,
        url,
      };
    }

    case fromUpload.UPLOAD_URL_FAIL: {
      return {
        ...state,
        fail: true
      };
    }
  }

  return state;
}

export const getUploadFile = (state: UploadState) => state.file;
export const getUploadUrl = (state: UploadState) => state.url;
