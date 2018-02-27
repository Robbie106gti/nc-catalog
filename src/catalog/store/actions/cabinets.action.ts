import { Action } from '@ngrx/store';
import { Cabinets } from '../../models/cabinets.model';

// load catalog
export const LOAD_CABINETS = '[Cabinets] Load Cabinets setup';
export const LOAD_CABINETS_FAIL = '[Cabinets] Load Cabinets setup Fail';
export const LOAD_CABINETS_SUCCESS = '[Cabinets] Load Cabinets setup Success';

export const CREATE_EDIT_CAB = '[Cabinet] Create to Edit Cabinet';
export const CREATE_EDIT_CAB_DEL = '[Cabinet] Delete to Edit Cabinet';

export const UPDATE_CABINET = '[Cabinets] Update Cabinets setup';
export const UPDATE_CABINET_FAIL = '[Cabinets] Update Cabinets setup Fail';
export const UPDATE_CABINET_SUCCESS = '[Cabinets] Update Cabinets setup Success';

export const REMOVE_FROM_CABINET = '[Cabinets] Remove item from Cabinets';
export const REMOVE_FROM_CABINET_FAIL = '[Cabinets] Remove item from Cabinets Fail';
export const REMOVE_FROM_CABINET_SUCCESS = '[Cabinets] Remove item from Cabinets Success';

export const UPLOAD_CABINET = '[Cabinets] Upload image Cabinets setup';
export const UPLOAD_CABINET_FAIL = '[Cabinets] Upload image Cabinets setup Fail';
export const UPLOAD_CABINET_SUCCESS = '[Cabinets] Upload image Cabinets setup Success';

export const DOWNLOAD_URL = '[Cabinets] Download image url';
export const DOWNLOAD_URL_FAIL = '[Cabinets] Download image url Fail';
export const DOWNLOAD_URL_SUCCESS = '[Cabinets] Download image url Success';

export class LoadCabinets implements Action {
  readonly type = LOAD_CABINETS;
  constructor(public payload: string) {
    // console.log(payload);
  }
}

export class LoadCabinetsFail implements Action {
  readonly type = LOAD_CABINETS_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class LoadCabinetsSuccess implements Action {
  readonly type = LOAD_CABINETS_SUCCESS;
  constructor(public payload: any) {
   // console.log(payload);
  }
}

// create items
export class CreateEditCab implements Action {
  readonly type = CREATE_EDIT_CAB;
  constructor(public payload: any) {
    console.log(payload);
  }
}

export class CreateDownloadUrl implements Action {
  readonly type = DOWNLOAD_URL;
  constructor(public payload: any) {
    console.log(payload);
  }
}

// update items
export class UpdateEditCab implements Action {
  readonly type = UPDATE_CABINET;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class UpdateEditCabFail implements Action {
  readonly type = UPDATE_CABINET_FAIL;
  constructor(public payload: any) {
    console.log(payload);
  }
}

export class UpdateEditCabSuccess implements Action {
  readonly type = UPDATE_CABINET_SUCCESS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class UploadCab implements Action {
  readonly type = UPLOAD_CABINET;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class UploadCabFail implements Action {
  readonly type = UPLOAD_CABINET_FAIL;
  constructor(public payload: any) {
    console.log(payload);
  }
}

export class UploadCabSuccess implements Action {
  readonly type = UPLOAD_CABINET_SUCCESS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class DownloadUrlSuccess implements Action {
  readonly type = DOWNLOAD_URL_SUCCESS;
  constructor(public payload: any) {
    // console.log(payload);
  }
}

export class DownloadUrlFail implements Action {
  readonly type = DOWNLOAD_URL_FAIL;
  constructor(public payload: any) {
    // console.log(payload);
  }
}


// delete items
export class CreateEditCabDel implements Action {
  readonly type = CREATE_EDIT_CAB_DEL;
  constructor(public payload: any) {
    console.log(payload);
  }
}
export class RemoveFromCab implements Action {
  readonly type = REMOVE_FROM_CABINET;
  constructor(public payload: any) {
    console.log(payload);
  }
}

export class RemoveFromCabFail implements Action {
  readonly type = REMOVE_FROM_CABINET_FAIL;
  constructor(public payload: any) {
    console.log(payload);
  }
}

export class RemoveFromCabSuccess implements Action {
  readonly type = REMOVE_FROM_CABINET_SUCCESS;
  constructor(public payload: any) {
    console.log(payload);
  }
}

// action types
export type CabinetsAction = LoadCabinets | LoadCabinetsFail | LoadCabinetsSuccess |
CreateEditCab | CreateEditCabDel | UpdateEditCab | UpdateEditCabFail | UpdateEditCabSuccess | UploadCab | UploadCabFail | UploadCabSuccess |
CreateDownloadUrl | DownloadUrlFail | DownloadUrlSuccess | RemoveFromCab | RemoveFromCabFail | RemoveFromCabSuccess;
