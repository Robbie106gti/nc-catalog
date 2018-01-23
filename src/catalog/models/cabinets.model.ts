import { CrudInfo } from './crud.model';

export interface Cabinets {
    id: string;
    code: string;
    title: string;
    crudInfo: CrudInfo;
    heights: [{ height: string }];
    image: string;
    tags?: any[];
}

export interface Item {
    id: string;
    code: string;
    title: string;
    crudInfo: CrudInfo;
    heights: [{ height: string }];
    image: string;
    tags?: any[];
}
