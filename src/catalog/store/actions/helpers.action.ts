import { Action } from '@ngrx/store';

// load catalog
export const LOAD_HELPERS = '[Helpers] Load Helpers setup';
export const LOAD_HELPERS_FAIL = '[Helpers] Load Helpers setup Fail';
export const LOAD_HELPERS_SUCCESS = '[Helpers] Load Helpers setup Success';

export const LOAD_HELPERS_ADDONS = '[Helpers] Load Helpers Addons setup';
export const LOAD_HELPERS_FAIL_ADDONS = '[Helpers] Load Helpers Addons Fail';
export const LOAD_HELPERS_SUCCESS_ADDONS = '[Helpers] Load Helpers Addons Success';

export const LOAD_HELPERS_IWHD = '[Helpers] Load Helpers IWHD setup';
export const LOAD_HELPERS_FAIL_IWHD = '[Helpers] Load Helpers IWHD Fail';
export const LOAD_HELPERS_SUCCESS_IWHD = '[Helpers] Load Helpers IWHD Success';

export const LOAD_HELPERS_NOTES = '[Helpers] Load Helpers Notes setup';
export const LOAD_HELPERS_FAIL_NOTES = '[Helpers] Load Helpers Notes Fail';
export const LOAD_HELPERS_SUCCESS_NOTES = '[Helpers] Load Helpers Notes Success';

export const LOAD_HELPERS_SPEC = '[Helpers] Load Helpers Spec setup';
export const LOAD_HELPERS_FAIL_SPEC = '[Helpers] Load Helpers Spec Fail';
export const LOAD_HELPERS_SUCCESS_SPEC = '[Helpers] Load Helpers Spec Success';

export class LoadHelpers implements Action {
  readonly type = LOAD_HELPERS;
  constructor(public payload: any) {}
}

export class LoadHelpersFail implements Action {
  readonly type = LOAD_HELPERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadHelpersSuccess implements Action {
  readonly type = LOAD_HELPERS_SUCCESS;
  constructor(public payload: any[]) {}
}

export class LoadHelpersAddons implements Action {
  readonly type = LOAD_HELPERS_ADDONS;
}

export class LoadHelpersFailAddons implements Action {
  readonly type = LOAD_HELPERS_FAIL_ADDONS;
  constructor(public payload: any) {}
}

export class LoadHelpersSuccessAddons implements Action {
  readonly type = LOAD_HELPERS_SUCCESS_ADDONS;
  constructor(public payload: any[]) {}
}

export class LoadHelpersIWHD implements Action {
  readonly type = LOAD_HELPERS_IWHD;
}

export class LoadHelpersFailIWHD implements Action {
  readonly type = LOAD_HELPERS_FAIL_IWHD;
  constructor(public payload: any) {}
}

export class LoadHelpersSuccessIWHD implements Action {
  readonly type = LOAD_HELPERS_SUCCESS_IWHD;
  constructor(public payload: any[]) {}
}

export class LoadHelpersNotes implements Action {
  readonly type = LOAD_HELPERS_NOTES;
}

export class LoadHelpersFailNotes implements Action {
  readonly type = LOAD_HELPERS_FAIL_NOTES;
  constructor(public payload: any) {}
}

export class LoadHelpersSuccessNotes implements Action {
  readonly type = LOAD_HELPERS_SUCCESS_NOTES;
  constructor(public payload: any[]) {}
}

export class LoadHelpersSpec implements Action {
  readonly type = LOAD_HELPERS_SPEC;
}

export class LoadHelpersFailSpec implements Action {
  readonly type = LOAD_HELPERS_FAIL_SPEC;
  constructor(public payload: any) {}
}

export class LoadHelpersSuccessSpec implements Action {
  readonly type = LOAD_HELPERS_SUCCESS_SPEC;
  constructor(public payload: any[]) {}
}

// create items
// update items
// delete items

// action types
export type HelpersAction = LoadHelpers | LoadHelpersFail | LoadHelpersSuccess
| LoadHelpersAddons | LoadHelpersFailAddons | LoadHelpersSuccessAddons
| LoadHelpersIWHD | LoadHelpersFailIWHD | LoadHelpersSuccessIWHD
| LoadHelpersNotes | LoadHelpersFailNotes | LoadHelpersSuccessNotes
| LoadHelpersSpec | LoadHelpersFailSpec | LoadHelpersSuccessSpec;
