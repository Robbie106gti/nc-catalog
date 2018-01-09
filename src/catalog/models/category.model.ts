import { CrudInfo } from './crud.model';

export interface Category {
    id: string;
    code: string;
    title: string;
    crudInfo: CrudInfo;
    heights: [{ height: string }];
    image: string;
    tags?: any[];
}
