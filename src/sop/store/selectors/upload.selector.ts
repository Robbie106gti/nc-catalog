import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromUpload from '../reducers/upload.reducer';
import { Upload } from '..';

export const getUploadState = createSelector(
  fromFeature.getSopsState,
  (state: fromFeature.SopsState) => state.upload
);

export const getUploadFile = createSelector(
  getUploadState,
  fromUpload.getUploadFile
);

export const getUploadUrl = createSelector(
  getUploadState,
  fromUpload.getUploadUrl
);

export const getUploadFail = createSelector(
  getUploadState,
  upload => upload.fail
);

export const getUploadPercentage = createSelector(
  getUploadFile,
  upload => {
    const pct = (upload['bytesTransferred'] / (upload['totalBytes'] / 100)).toFixed(0);
    return pct;
  }
);
