import { CrudInfo } from './crud.model';

export interface Catalog {
    id: string;
    description: string;
    image: string;
    title: string;
    crudInfo: CrudInfo;
    tags?: any[];
}
