export interface Door {
  id: string;
  active: boolean;
  construction: Options;
  choices: Choices;
  params: Params;
  dfoptions: string[];
  doorstyle: string;
  finishing: string;
  image: string;
  images: Images;
  materials: string[];
  options: Options;
  restrictions: Options;
  sizes: Sizes;
  title: string;
  updatedAt: string;
  updatedBy: string;
  sub: string;
  edges?: string[];
  tags?: string[];
  srstandard?: string[];
  mtg?: string[];
  notes?: string[];
  grain?: string[];
}

export interface Choices {
  title: string;
  pc1?: Base;
  pc2?: Base;
  pc5?: Base;
  wide?: Base;
}

export interface Base {
  active: boolean;
  default: boolean;
}

export interface Options {
  default: string;
  painted?: string;
  wood?: string;
  engineered?: string;
}

export interface Images {
  engineered: Image;
  painted: Image;
  spec: Image;
  wood: Image;
}

export interface Image {
  image: string;
  title: string;
  imageHG?: string;
  imageVG?: string;
  material?: string;
}

export interface Params {
  mat: string;
  pc?: string;
  wr?: boolean;
}

export interface Sizes {
  height: string;
  width: string;
  drawerSTheight: string;
  drawerNRheight: string;
}
