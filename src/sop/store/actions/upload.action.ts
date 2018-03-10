import { Action } from '@ngrx/store';

// load catalog
export const UPLOAD = '[Upload] Upload setup';
export const UPLOAD_FAIL = '[Upload] Upload setup Fail';
export const UPLOAD_SUCCESS = '[Upload] Upload setup Success';

export const UPLOAD_URL = '[Upload] Url setup';
export const UPLOAD_URL_FAIL = '[Upload] Url setup Fail';
export const UPLOAD_URL_SUCCESS = '[Upload] Url setup Success';

export class Upload implements Action {
  readonly type = UPLOAD;
  constructor(public payload: any) {}
}

export class UploadFail implements Action {
  readonly type = UPLOAD_FAIL;
  constructor(public payload: any) {}
}

export class UploadSuccess implements Action {
  readonly type = UPLOAD_SUCCESS;
  constructor(public payload: any) {}
}
export class UploadUrl implements Action {
  readonly type = UPLOAD_URL;
  constructor(public payload: any) {}
}

export class UploadUrlFail implements Action {
  readonly type = UPLOAD_URL_FAIL;
  constructor(public payload: any) {}
}

export class UploadUrlSuccess implements Action {
  readonly type = UPLOAD_URL_SUCCESS;
  constructor(public payload: any) {}
}

// create items
// update items
// delete items

// action types
export type UploadAction = Upload | UploadFail | UploadSuccess | UploadUrl | UploadUrlFail | UploadUrlSuccess;
