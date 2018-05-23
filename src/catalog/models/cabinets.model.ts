import { CrudInfo } from './crud.model';

export interface Cabinets {
  id: string;
  active: boolean;
  code: string;
  title: string;
  description: string;
  heights: [Heights];
  image: string;
  link: string;
  tags?: any[];
  versions?: { string: Versions };
  specifications?: any[];
  iwhd?: IWHD;
  notes?: any[];
  addons?: any[];
  sub?: string;
  cabinet?: boolean;
}

interface IWHD {
  depth?: string;
  increments?: string;
  widths?: string;
  heights?: string;
}

interface Heights {
  height?: string;
  id?: string;
  title?: string;
}

interface Versions {
  active: boolean;
  id: string;
  images: { string: Image };
  iwhd: IWHD;
  specifications?: any[];
  title: string;
}

interface Image {
  image: string;
  title?: string;
}
